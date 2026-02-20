/**
 * Generates `.global.ts` files from `.impl.ts` files.
 *
 * Each helper in this project has two forms: a standalone function (`foo.impl.ts`) and a
 * prototype augmentation (`foo.global.ts`). This script auto-generates the globals from
 * the impls to keep them in sync.
 *
 * For each impl file discovered under `src/{array,map,temporal}/`, the script:
 * 1. Parses exported function signatures, overloads, and JSDoc
 * 2. Classifies array overloads (CallbackFn → Array<T>, CallbackFnRO → ReadonlyArray<T>)
 * 3. Transforms signatures (first param → `this`, strips interface-provided generics)
 * 4. Transforms JSDoc (removes first @param, rewrites examples to method form)
 * 5. Emits the declare block (global or module augmentation) and prototype assignment
 *
 * Supports four output patterns: direct assignment, property getter (Object.defineProperty),
 * multi-export (Object.entries loop), and multi-overload (direct assignment with `as any` cast).
 *
 * Usage:
 *   yarn tsx scripts/generate-globals.ts          # regenerate all
 *   yarn tsx scripts/generate-globals.ts --check  # exit non-zero if out of date (for CI)
 */
import * as fs from "fs";
import * as path from "path";

const SRC_DIR = path.join(__dirname, "..", "src");
const CHECK_MODE = process.argv.includes("--check");

// ─── Property names (getters, not methods) ──────────────────────────────────

const PROPERTY_NAMES = new Set([
  "first",
  "last",
  "isEmpty",
  "nonEmpty",
  "isMonday",
  "isTuesday",
  "isWednesday",
  "isThursday",
  "isFriday",
  "isSaturday",
  "isSunday",
]);

// ─── Types ───────────────────────────────────────────────────────────────────

type TargetKind = "array" | "map" | "plainDate" | "zonedDateTime" | "legacyDate";

interface TargetInfo {
  kind: TargetKind;
  /** Interfaces to declare in, e.g. ["Array<T>", "ReadonlyArray<T>"] */
  interfaces: string[];
  /** Generic params for the interface, e.g. "<T>" */
  interfaceGenerics: string;
  /** Prototype to assign to, e.g. "Array.prototype" */
  prototype: string;
  /** Whether we use `declare global` vs `declare module "temporal-polyfill"` */
  declareStyle: "global" | "module";
  /** Self parameter type, e.g. "T[]" */
  selfType: string;
  /** Temporal type prefix for references, e.g. "Temporal.PlainDate" */
  temporalType?: string;
}

interface ParsedOverload {
  jsdoc: string[];
  signature: string;
}

interface ParsedFunction {
  name: string;
  overloads: ParsedOverload[];
  implSignature: string;
}

// ─── Target classification ───────────────────────────────────────────────────

function classifyTarget(implPath: string): TargetInfo {
  const rel = path.relative(SRC_DIR, implPath).replace(/\\/g, "/");

  if (rel.startsWith("array/")) {
    return {
      kind: "array",
      interfaces: ["Array<T>", "ReadonlyArray<T>"],
      interfaceGenerics: "<T>",
      prototype: "Array.prototype",
      declareStyle: "global",
      selfType: "T[]",
    };
  }
  if (rel.startsWith("map/")) {
    return {
      kind: "map",
      interfaces: ["Map<K, V>"],
      interfaceGenerics: "<K, V>",
      prototype: "Map.prototype",
      declareStyle: "global",
      selfType: "Map<K, V>",
    };
  }
  if (rel.startsWith("temporal/plainDate/")) {
    return {
      kind: "plainDate",
      interfaces: ["PlainDate"],
      interfaceGenerics: "",
      prototype: "Temporal.PlainDate.prototype",
      declareStyle: "module",
      selfType: "Temporal.PlainDate",
      temporalType: "Temporal.PlainDate",
    };
  }
  if (rel.startsWith("temporal/zonedDateTime/")) {
    return {
      kind: "zonedDateTime",
      interfaces: ["ZonedDateTime"],
      interfaceGenerics: "",
      prototype: "Temporal.ZonedDateTime.prototype",
      declareStyle: "module",
      selfType: "Temporal.ZonedDateTime",
      temporalType: "Temporal.ZonedDateTime",
    };
  }
  if (rel.startsWith("temporal/legacyDate/")) {
    return {
      kind: "legacyDate",
      interfaces: ["Date"],
      interfaceGenerics: "",
      prototype: "Date.prototype",
      declareStyle: "global",
      selfType: "Date",
    };
  }
  throw new Error(`Unknown target for ${implPath}`);
}

// ─── Discovery ───────────────────────────────────────────────────────────────

interface ImplFile {
  implPath: string;
  globalPath: string;
  target: TargetInfo;
}

function discoverImplFiles(): ImplFile[] {
  const results: ImplFile[] = [];

  const dirs = [
    path.join(SRC_DIR, "array"),
    path.join(SRC_DIR, "map"),
    path.join(SRC_DIR, "temporal", "plainDate"),
    path.join(SRC_DIR, "temporal", "zonedDateTime"),
    path.join(SRC_DIR, "temporal", "legacyDate"),
  ];

  for (const dir of dirs) {
    const parentName = path.basename(dir);
    const subdirs = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory());
    for (const subdir of subdirs) {
      const subdirPath = path.join(dir, subdir.name);
      const files = fs.readdirSync(subdirPath).filter((f) => f.endsWith(".impl.ts") && !f.includes(".test."));
      for (const file of files) {
        const baseName = file.replace(".impl.ts", "");
        // Skip barrels: filename matches grandparent dir name
        if (baseName === parentName) continue;
        const implPath = path.join(subdirPath, file);
        const globalPath = path.join(subdirPath, `${baseName}.global.ts`);
        results.push({ implPath, globalPath, target: classifyTarget(implPath) });
      }
    }
  }

  results.sort((a, b) => a.implPath.localeCompare(b.implPath));
  return results;
}

// ─── Parsing ─────────────────────────────────────────────────────────────────

function parseImplFile(filePath: string): { functions: ParsedFunction[]; imports: string[] } {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const imports: string[] = [];
  const functions: ParsedFunction[] = [];
  const exportedNames = new Set<string>();

  // Check for `export { name }` at end
  const exportBraceMatch = content.match(/export\s*\{\s*([^}]+)\}/);
  if (exportBraceMatch) {
    exportBraceMatch[1]
      .split(",")
      .map((n) => n.trim())
      .forEach((n) => exportedNames.add(n));
  }

  let currentJsdoc: string[] = [];
  let inJsdoc = false;
  let currentSig = "";
  let bracketDepth = { angle: 0, paren: 0 };
  let collectingSig = false;
  let currentFuncName = "";
  let isExported = false;

  // Map from function name -> { overloads, implSignature }
  const funcMap = new Map<string, { overloads: ParsedOverload[]; implSignature: string }>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Collect imports
    if (trimmed.startsWith("import ")) {
      imports.push(trimmed);
      continue;
    }

    // Track JSDoc blocks
    if (trimmed.startsWith("/**")) {
      inJsdoc = true;
      currentJsdoc = [line];
      if (trimmed.endsWith("*/")) {
        inJsdoc = false;
      }
      continue;
    }
    if (inJsdoc) {
      currentJsdoc.push(line);
      if (trimmed.endsWith("*/")) {
        inJsdoc = false;
      }
      continue;
    }

    // Detect function signature start
    const funcMatch = trimmed.match(/^(export\s+)?(async\s+)?function\s+(\w+)/);
    if (funcMatch && !collectingSig) {
      isExported = !!funcMatch[1] || exportedNames.has(funcMatch[3]);
      if (!isExported) {
        currentJsdoc = [];
        continue;
      }
      currentFuncName = funcMatch[3];
      collectingSig = true;
      currentSig = trimmed;
      bracketDepth = { angle: 0, paren: 0 };
      updateBracketDepth(trimmed, bracketDepth);

      // Check if the line is complete (ends with ; or {)
      if (isSignatureComplete(trimmed, bracketDepth)) {
        finishSignature();
      }
      continue;
    }

    if (collectingSig) {
      currentSig += " " + trimmed;
      updateBracketDepth(trimmed, bracketDepth);
      if (isSignatureComplete(trimmed, bracketDepth)) {
        finishSignature();
      }
      continue;
    }

    // Reset JSDoc if we didn't hit a function
    if (trimmed && !trimmed.startsWith("*") && !trimmed.startsWith("//")) {
      currentJsdoc = [];
    }
  }

  function finishSignature() {
    collectingSig = false;
    let sig = currentSig;

    // Remove export keyword
    sig = sig.replace(/^export\s+/, "");

    if (!funcMap.has(currentFuncName)) {
      funcMap.set(currentFuncName, { overloads: [], implSignature: "" });
    }
    const entry = funcMap.get(currentFuncName)!;

    if (sig.trimEnd().endsWith("{")) {
      // Implementation signature
      entry.implSignature = sig;
    } else {
      // Overload signature
      entry.overloads.push({
        jsdoc: [...currentJsdoc],
        signature: sig,
      });
    }

    currentJsdoc = [];
  }

  // Build final functions array
  for (const [name, entry] of funcMap) {
    // If 0 overloads, treat impl as single overload
    if (entry.overloads.length === 0 && entry.implSignature) {
      // Extract the JSDoc that was likely on the impl
      // We need to re-parse to find it since it wasn't captured as an overload
      const implJsdoc = findImplJsdoc(content, name);
      entry.overloads.push({
        jsdoc: implJsdoc,
        signature: implSigToOverload(entry.implSignature),
      });
    }
    functions.push({
      name,
      overloads: entry.overloads,
      implSignature: entry.implSignature,
    });
  }

  return { functions, imports };
}

function findImplJsdoc(content: string, funcName: string): string[] {
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    // Look for the function declaration (not an overload — followed by {)
    const match = trimmed.match(new RegExp(`^(?:export\\s+)?(?:async\\s+)?function\\s+${funcName}\\b`));
    if (match) {
      // Check if this is an implementation (has { eventually)
      let j = i;
      const depth = { angle: 0, paren: 0 };
      while (j < lines.length) {
        updateBracketDepth(lines[j].trim(), depth);
        if (lines[j].trim().endsWith("{") && depth.angle === 0 && depth.paren === 0) {
          // This is the implementation — look backward for JSDoc
          let jsdocStart = i - 1;
          while (jsdocStart >= 0 && lines[jsdocStart].trim().startsWith("*")) jsdocStart--;
          if (jsdocStart >= 0 && lines[jsdocStart].trim().startsWith("/**")) {
            return lines.slice(jsdocStart, i);
          }
          break;
        }
        if (lines[j].trim().endsWith(";") && depth.angle === 0 && depth.paren === 0) {
          break; // Overload, not impl
        }
        j++;
      }
    }
  }
  return [];
}

function implSigToOverload(sig: string): string {
  // Convert implementation signature to overload by finding the balanced closing paren
  // and keeping everything up to (but not including) the opening body brace
  const s = sig.replace(/^async\s+/, "").replace(/^function\s+\w+/, "");
  const funcPrefix = sig.slice(0, sig.length - s.length);

  // Skip generics
  let genEnd = 0;
  if (s.startsWith("<")) {
    let depth = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "<") depth++;
      if (s[i] === ">") {
        depth--;
        if (depth === 0) {
          genEnd = i + 1;
          break;
        }
      }
    }
  }

  // Find balanced parens
  const parenStart = s.indexOf("(", genEnd);
  let depth = 0;
  let parenEnd = parenStart;
  for (let i = parenStart; i < s.length; i++) {
    if (s[i] === "(") depth++;
    if (s[i] === ")") {
      depth--;
      if (depth === 0) {
        parenEnd = i;
        break;
      }
    }
  }

  // Everything from start through closing paren + return type
  const afterParen = s.slice(parenEnd + 1).trim();
  const retMatch = afterParen.match(/^(:\s*.+?)\s*\{/);
  const retType = retMatch ? retMatch[1] : "";

  return funcPrefix + s.slice(0, parenEnd + 1) + retType + ";";
}

function updateBracketDepth(line: string, depth: { angle: number; paren: number }) {
  // Skip string contents
  let inString: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inString) {
      if (ch === inString && line[i - 1] !== "\\") inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
      continue;
    }
    if (ch === "<") depth.angle++;
    if (ch === ">") {
      // Don't count > that's part of => (arrow function)
      if (i + 1 < line.length && line[i + 1] === "=") continue;
      // Don't count > that would make depth go negative (it's a comparison)
      if (depth.angle > 0) depth.angle--;
    }
    if (ch === "(") depth.paren++;
    if (ch === ")") depth.paren--;
  }
}

function isSignatureComplete(line: string, depth: { angle: number; paren: number }): boolean {
  const trimmed = line.trim();
  return (trimmed.endsWith(";") || trimmed.endsWith("{")) && depth.angle === 0 && depth.paren === 0;
}

// ─── Overload classification (array only) ────────────────────────────────────

type ArrayOverloadKind = "mutable" | "readonly" | "both";

function classifyArrayOverload(signature: string): ArrayOverloadKind {
  if (
    signature.includes("CallbackFn<") &&
    !signature.includes("CallbackFnRO<") &&
    !signature.includes("CallbackFnEither<")
  ) {
    return "mutable";
  }
  if (signature.includes("CallbackFnRO<")) {
    return "readonly";
  }
  return "both";
}

// ─── Signature transformation ────────────────────────────────────────────────

function transformSignatureForGlobal(
  signature: string,
  funcName: string,
  target: TargetInfo,
  forInterface: string,
): { methodSig: string; needsThisConstraint: boolean; thisType: string } {
  // Parse: [async] function name<generics>(params): returnType;
  let sig = signature.replace(/^async\s+/, "").replace(/^function\s+\w+/, "");

  // Extract generics
  let generics = "";
  if (sig.startsWith("<")) {
    let depth = 0;
    let end = 0;
    for (let i = 0; i < sig.length; i++) {
      if (sig[i] === "<") depth++;
      if (sig[i] === ">") {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    generics = sig.slice(0, end);
    sig = sig.slice(end);
  }

  // Extract params (between outermost parens)
  const parenStart = sig.indexOf("(");
  let depth = 0;
  let parenEnd = 0;
  for (let i = parenStart; i < sig.length; i++) {
    if (sig[i] === "(") depth++;
    if (sig[i] === ")") {
      depth--;
      if (depth === 0) {
        parenEnd = i;
        break;
      }
    }
  }
  const paramsStr = sig.slice(parenStart + 1, parenEnd);
  const returnType = sig
    .slice(parenEnd + 1)
    .replace(/^\s*:\s*/, "")
    .replace(/;$/, "")
    .trim();

  // Parse params
  const params = splitParams(paramsStr);

  // Remove first param (becomes `this`)
  const firstParam = params.shift() || "";

  // Extract the first param type for this constraint detection
  const firstParamType = firstParam
    .replace(/^\w+\s*:\s*/, "")
    .replace(/\s*=.*$/, "")
    .trim();

  // Strip generics from method that the interface provides
  let methodGenerics = generics;
  if (target.kind === "array") {
    // Strip T from generics (interface provides it)
    methodGenerics = stripGenericParam(methodGenerics, "T");
  } else if (target.kind === "map") {
    methodGenerics = stripGenericParam(stripGenericParam(methodGenerics, "K"), "V");
  }

  // Check if we need a this constraint
  // If no remaining params and first param is a specific type (not generic T[] / readonly T[])
  const needsThisConstraint = target.kind === "array" && params.length === 0 && !isGenericArrayType(firstParamType);

  let thisType = firstParamType;

  if (forInterface === "Array<T>" && needsThisConstraint) {
    // Strip readonly from this type for Array<T>
    thisType = thisType.replace(/^readonly\s+/, "");
  } else if (forInterface === "ReadonlyArray<T>" && needsThisConstraint && !thisType.startsWith("readonly ")) {
    thisType = "readonly " + thisType;
  }

  // Build method signature
  const isProperty = PROPERTY_NAMES.has(funcName);

  // Determine effective return type — infer when no explicit annotation
  let effectiveReturnType = returnType;
  if (!effectiveReturnType) {
    if (isProperty) {
      effectiveReturnType = "boolean";
    } else {
      // Try to infer from function name/context
      effectiveReturnType = inferReturnType(funcName, target);
    }
  }

  // Strip readonly from return types for array targets (Array.prototype operates on mutable arrays)
  if (target.kind === "array" && effectiveReturnType.startsWith("readonly ")) {
    effectiveReturnType = effectiveReturnType.slice("readonly ".length);
  }

  if (isProperty) {
    // Property declaration: `readonly name: returnType;` (getter-only)
    return {
      methodSig: `readonly ${funcName}: ${effectiveReturnType};`,
      needsThisConstraint: false,
      thisType,
    };
  }

  // Convert default values to optional params: `foo: T = val` → `foo?: T`
  // But don't match `=` that's part of `=>` (arrow functions)
  const interfaceParams = params.map((p) => convertDefaultToOptional(p));

  const paramsString = interfaceParams.join(", ");

  let methodSig: string;
  if (needsThisConstraint) {
    methodSig = `${funcName}${methodGenerics}(this: ${thisType}): ${effectiveReturnType};`;
  } else {
    methodSig = `${funcName}${methodGenerics}(${paramsString}): ${effectiveReturnType};`;
  }

  return { methodSig, needsThisConstraint, thisType };
}

function inferReturnType(funcName: string, target: TargetInfo): string {
  // For functions without explicit return type annotations, infer from patterns
  if (funcName === "remove" || funcName === "removeAll") return "void";
  if (target.kind === "plainDate") {
    if (funcName.startsWith("to") && funcName.includes("ZonedDateTime")) return "Temporal.ZonedDateTime";
    if (funcName.startsWith("to") && !funcName.includes("Interval")) return "Temporal.ZonedDateTime";
    // isDayOfWeek handled by PROPERTY_NAMES
    return "Temporal.PlainDate";
  }
  if (target.kind === "zonedDateTime") {
    if (funcName.startsWith("toPlainDate")) return "Temporal.PlainDate";
    if (funcName.startsWith("toLegacyDate")) return "Date";
    return "Temporal.ZonedDateTime";
  }
  if (target.kind === "legacyDate") {
    if (funcName === "toPlainDate") return "Temporal.PlainDate";
    if (funcName === "toZonedDateTime") return "Temporal.ZonedDateTime";
    return "void";
  }
  return "void";
}

function convertDefaultToOptional(param: string): string {
  // Find a `= value` that's NOT part of `=>` at the top level (not inside nested brackets)
  // Strategy: scan from the end for `= ` that's not `=> `
  let depth = 0;
  let inString: string | null = null;
  for (let i = param.length - 1; i >= 0; i--) {
    const ch = param[i];
    if (inString) {
      if (ch === inString && (i === 0 || param[i - 1] !== "\\")) inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
      continue;
    }
    if (ch === ">" || ch === ")" || ch === "]" || ch === "}") depth++;
    if (ch === "<" || ch === "(" || ch === "[" || ch === "{") depth--;
    if (ch === "=" && depth === 0 && i > 0 && param[i - 1] !== ">" && param[i - 1] !== "!" && param[i - 1] !== "<") {
      // This is a default value assignment
      const before = param.slice(0, i).trimEnd();
      // Extract name and type
      const match = before.match(/^(\w+)\s*:\s*(.+)$/);
      if (match) {
        return `${match[1]}?: ${match[2].trimEnd()}`;
      }
    }
  }
  return param;
}

function isGenericArrayType(type: string): boolean {
  // Match T[], readonly T[], (T | undefined)[], etc. where T is a generic param
  const stripped = type.replace(/^readonly\s+/, "");
  return stripped === "T[]" || stripped === "readonly T[]";
}

function stripGenericParam(generics: string, param: string): string {
  if (!generics) return generics;
  // Remove < and >
  const inner = generics.slice(1, -1).trim();
  // Split by top-level commas
  const parts = splitGenericParams(inner);
  const filtered = parts.filter((p) => {
    const name = p.trim().split(/\s+/)[0];
    return name !== param;
  });
  if (filtered.length === 0) return "";
  return `<${filtered.join(", ")}>`;
}

/** Qualify temporal-specific types with Temporal. prefix for use outside declare module blocks */
function qualifyTemporalTypes(s: string, target: TargetInfo): string {
  if (target.declareStyle !== "module") return s;
  // Qualify BusinessDayOptions, WeekOptions, Interval< that aren't already Temporal.-prefixed
  s = s.replace(/(?<!Temporal\.)(?<!\w)BusinessDayOptions/g, "Temporal.BusinessDayOptions");
  s = s.replace(/(?<!Temporal\.)(?<!\w)WeekOptions/g, "Temporal.WeekOptions");
  s = s.replace(/(?<!Temporal\.)(?<!\w)Interval</g, "Temporal.Interval<");
  return s;
}

function splitGenericParams(str: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of str) {
    if (ch === "<") depth++;
    if (ch === ">") depth--;
    if (ch === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function splitParams(str: string): string[] {
  if (!str.trim()) return [];
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  let inString: string | null = null;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      current += ch;
      if (ch === inString && str[i - 1] !== "\\") inString = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
      current += ch;
      continue;
    }
    if (ch === "<" || ch === "(" || ch === "[" || ch === "{") depth++;
    if (ch === ">" || ch === ")" || ch === "]" || ch === "}") {
      // Don't decrement for > that's part of =>
      if (ch === ">" && i + 1 < str.length && str[i + 1] === "=") {
        // This is => (arrow), not a closing angle bracket
      } else if (ch === ">" && depth <= 0) {
        // Don't let depth go negative
      } else {
        depth--;
      }
    }
    if (ch === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

// ─── JSDoc transformation ────────────────────────────────────────────────────

function transformJsdoc(jsdocLines: string[], funcName: string, target: TargetInfo, isMultiExport: boolean): string[] {
  if (jsdocLines.length === 0) return [];

  // Parse the JSDoc content
  const raw = jsdocLines.map((l) => l.trim()).join("\n");

  // Extract the content between /** and */
  const body = raw.replace(/^\/\*\*\s*\n?/, "").replace(/\n?\s*\*\/$/, "");
  let bodyLines = body.split("\n").map((l) => {
    const trimmed = l.trim();
    return trimmed.startsWith("* ") ? trimmed.slice(2) : trimmed === "*" ? "" : trimmed;
  });

  // 1. Remove first @param (and continuation lines)
  bodyLines = removeFirstParam(bodyLines);

  // 2. Remove ` - ` dash from remaining @param tags
  bodyLines = bodyLines.map((line) => {
    if (line.startsWith("@param ")) {
      return line.replace(/^(@param\s+\S+)\s+-\s+/, "$1 ");
    }
    return line;
  });

  // 3. Transform description: "an array" → "the array", "a PlainDate" → "the PlainDate", etc.
  bodyLines = bodyLines.map((line) => {
    if (line.startsWith("@")) return line;
    return transformDescription(line, target);
  });

  // 4. Transform @example
  bodyLines = transformExamples(bodyLines, funcName, target, isMultiExport);

  // Filter out empty leading/trailing lines
  while (bodyLines.length > 0 && bodyLines[0] === "") bodyLines.shift();
  while (bodyLines.length > 0 && bodyLines[bodyLines.length - 1] === "") bodyLines.pop();

  // Rebuild JSDoc
  const result = ["/**"];
  for (const line of bodyLines) {
    result.push(line === "" ? " *" : ` * ${line}`);
  }
  result.push(" */");
  return result;
}

function removeFirstParam(lines: string[]): string[] {
  const result: string[] = [];
  let removingParam = false;
  let foundFirst = false;

  for (const line of lines) {
    if (line.startsWith("@param ") && !foundFirst) {
      foundFirst = true;
      removingParam = true;
      continue;
    }
    if (removingParam) {
      // Continuation lines for @param are indented or don't start with @
      if (line.startsWith("@") || line === "") {
        removingParam = false;
        result.push(line);
      }
      // else skip continuation line
      continue;
    }
    result.push(line);
  }

  return result;
}

function transformDescription(line: string, target: TargetInfo): string {
  if (target.kind === "array") {
    line = line.replace(/\ban array\b/g, "the array");
    line = line.replace(/\bAn array\b/g, "The array");
    // "from an array" → "from the array"
    line = line.replace(/\bof an array\b/g, "of the array");
    line = line.replace(/\bin an array\b/g, "in the array");
  } else if (target.kind === "map") {
    line = line.replace(/\ba Map\b/g, "the Map");
    line = line.replace(/\bA Map\b/g, "The Map");
  } else if (target.kind === "plainDate") {
    line = line.replace(/\ba PlainDate\b/g, "the PlainDate");
    line = line.replace(/\ba date\b/g, "the date");
    line = line.replace(/\bA date\b/g, "The date");
    line = line.replace(/\ba given date\b/g, "the date");
  } else if (target.kind === "zonedDateTime") {
    line = line.replace(/\ba ZonedDateTime\b/g, "the ZonedDateTime");
    line = line.replace(/\ba date\b/g, "the date");
    line = line.replace(/\bA date\b/g, "The date");
    line = line.replace(/\ba given date\b/g, "the date");
  } else if (target.kind === "legacyDate") {
    line = line.replace(/\ba legacy Date\b/g, "the legacy Date");
    line = line.replace(/\bA legacy Date\b/g, "The legacy Date");
    line = line.replace(/\ba Date\b/g, "the Date");
  }
  return line;
}

function transformExamples(lines: string[], funcName: string, target: TargetInfo, isMultiExport: boolean): string[] {
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    if (!lines[i].startsWith("@example")) {
      result.push(lines[i]);
      i++;
      continue;
    }

    // Collect the full example block
    const exampleLines: string[] = [];
    // @example tag itself (may have content on same line)
    const firstLine = lines[i].replace("@example", "").trim();
    i++;

    // Collect continuation lines until next @tag or end
    if (firstLine) {
      exampleLines.push(firstLine);
    }
    while (i < lines.length && !lines[i].startsWith("@")) {
      exampleLines.push(lines[i]);
      i++;
    }

    // Now transform the example
    const transformed = transformSingleExample(exampleLines, funcName, target, isMultiExport);
    // Collapse multi-line examples to single line
    const collapsed = transformed.join(" ").replace(/\s+/g, " ").trim();

    result.push(`@example ${collapsed}`);
  }

  return result;
}

function transformSingleExample(
  exampleLines: string[],
  funcName: string,
  _target: TargetInfo,
  isMultiExport: boolean,
): string[] {
  // Join lines for manipulation
  let text = exampleLines.join("\n");

  const isProperty = PROPERTY_NAMES.has(funcName);

  // Determine what function names to look for in this file
  // For multi-export files, the funcName might be a module name, so we need to find
  // the actual function call in the example
  const fnNames = isMultiExport ? findFunctionNamesInExample(text) : [funcName];

  for (const fn of fnNames) {
    if (isProperty || PROPERTY_NAMES.has(fn)) {
      // Transform: funcName(firstArg) → firstArg.funcName (property getter, drop parens)
      text = transformFunctionCallToGetter(text, fn);
    } else {
      // Transform: funcName(firstArg, ...) → firstArg.funcName(...)
      text = transformFunctionCallToMethod(text, fn);
    }
  }

  return text.split("\n");
}

function transformFunctionCallToGetter(text: string, funcName: string): string {
  // Transform: funcName(firstArg) → firstArg.funcName (balanced parens version)
  let result = "";
  let idx = 0;

  while (idx < text.length) {
    const fnIdx = text.indexOf(funcName + "(", idx);
    if (fnIdx === -1) {
      result += text.slice(idx);
      break;
    }
    if (fnIdx > 0 && /\w/.test(text[fnIdx - 1])) {
      result += text.slice(idx, fnIdx + funcName.length);
      idx = fnIdx + funcName.length;
      continue;
    }
    if (fnIdx > 0 && text[fnIdx - 1] === ".") {
      result += text.slice(idx, fnIdx + funcName.length);
      idx = fnIdx + funcName.length;
      continue;
    }

    result += text.slice(idx, fnIdx);

    const argsStart = fnIdx + funcName.length + 1;
    let depth = 1;
    let argsEnd = argsStart;
    while (argsEnd < text.length && depth > 0) {
      if (text[argsEnd] === "(") depth++;
      if (text[argsEnd] === ")") depth--;
      if (depth > 0) argsEnd++;
    }

    const argsStr = text.slice(argsStart, argsEnd);
    result += `${argsStr.trim()}.${funcName}`;
    idx = argsEnd + 1;
  }

  return result;
}

function transformFunctionCallToMethod(text: string, funcName: string): string {
  // Find funcName( and transform to method call
  let result = "";
  let idx = 0;

  while (idx < text.length) {
    const fnIdx = text.indexOf(funcName + "(", idx);
    if (fnIdx === -1) {
      result += text.slice(idx);
      break;
    }

    // Check if preceded by a word character (part of another identifier)
    if (fnIdx > 0 && /\w/.test(text[fnIdx - 1])) {
      result += text.slice(idx, fnIdx + funcName.length);
      idx = fnIdx + funcName.length;
      continue;
    }

    // Check if preceded by a dot (already a method call)
    if (fnIdx > 0 && text[fnIdx - 1] === ".") {
      result += text.slice(idx, fnIdx + funcName.length);
      idx = fnIdx + funcName.length;
      continue;
    }

    result += text.slice(idx, fnIdx);

    // Find the matching close paren
    const argsStart = fnIdx + funcName.length + 1; // after the (
    let depth = 1;
    let argsEnd = argsStart;
    while (argsEnd < text.length && depth > 0) {
      if (text[argsEnd] === "(") depth++;
      if (text[argsEnd] === ")") depth--;
      if (depth > 0) argsEnd++;
    }

    const argsStr = text.slice(argsStart, argsEnd);

    // Split into first arg and rest
    const { first, rest } = splitFirstArg(argsStr);

    if (rest !== undefined) {
      result += `${first}.${funcName}(${rest})`;
    } else {
      // No additional args — for method calls with no args
      result += `${first}.${funcName}()`;
    }

    idx = argsEnd + 1; // skip past the )
  }

  return result;
}

function splitFirstArg(argsStr: string): { first: string; rest: string | undefined } {
  let depth = 0;
  for (let i = 0; i < argsStr.length; i++) {
    const ch = argsStr[i];
    if (ch === "(" || ch === "[" || ch === "{" || ch === "<") depth++;
    if (ch === ")" || ch === "]" || ch === "}" || ch === ">") depth--;
    if (ch === "," && depth === 0) {
      return {
        first: argsStr.slice(0, i).trim(),
        rest: argsStr.slice(i + 1).trim(),
      };
    }
  }
  return { first: argsStr.trim(), rest: undefined };
}

function findFunctionNamesInExample(text: string): string[] {
  const names: string[] = [];
  const matches = text.matchAll(/\b([a-zA-Z]\w*)\s*\(/g);
  for (const m of matches) {
    if (
      ![
        "from",
        "new",
        "function",
        "if",
        "for",
        "while",
        "switch",
        "catch",
        "Map",
        "Date",
        "Array",
        "parseInt",
        "isNaN",
      ].includes(m[1])
    ) {
      if (!names.includes(m[1])) names.push(m[1]);
    }
  }
  return names;
}

// ─── Code generation ─────────────────────────────────────────────────────────

function generateGlobal(impl: ImplFile): string {
  const { implPath, target } = impl;
  const { functions } = parseImplFile(implPath);
  const baseName = path.basename(implPath, ".impl.ts");

  // Determine if multi-export
  const isMultiExport = functions.length > 1;

  // Generate the file
  const outputLines: string[] = [];

  // Generate interface declarations
  const interfaceBlocks: Map<string, string[]> = new Map();

  if (isMultiExport) {
    // Multi-export: all functions go into each interface
    for (const iface of target.interfaces) {
      const members: string[] = [];
      for (const func of functions) {
        const overloads =
          func.overloads.length > 0
            ? func.overloads
            : [{ jsdoc: [], signature: func.implSignature.replace(/\s*\{$/, ";") }];
        for (const overload of overloads) {
          const jsdoc = transformJsdoc(overload.jsdoc, func.name, target, isMultiExport);
          const transformed = transformSignatureForGlobal(overload.signature, func.name, target, iface);

          if (jsdoc.length > 0) {
            members.push(...jsdoc);
          }
          members.push(transformed.methodSig);
        }
      }
      interfaceBlocks.set(iface, members);
    }
  } else {
    // Single-export (possibly multi-overload)
    const func = functions[0];
    if (!func) {
      throw new Error(`No functions found in ${implPath}`);
    }

    for (const iface of target.interfaces) {
      const members: string[] = [];

      // Filter overloads for this interface
      const overloadsForInterface = getOverloadsForInterface(func, iface, target);

      for (const overload of overloadsForInterface) {
        const jsdoc = transformJsdoc(overload.jsdoc, func.name, target, false);
        const transformed = transformSignatureForGlobal(overload.signature, func.name, target, iface);

        if (jsdoc.length > 0) {
          members.push(...jsdoc);
        }
        members.push(transformed.methodSig);
      }

      if (members.length > 0) {
        interfaceBlocks.set(iface, members);
      }
    }
  }

  // Build declare block
  // For `declare global`: interface members at 4 spaces
  // For `declare module`: interface members at 6 spaces
  const memberIndent = target.declareStyle === "global" ? "    " : "      ";

  const declareLines: string[] = [];
  if (target.declareStyle === "global") {
    declareLines.push("declare global {");
    let first = true;
    for (const [iface, members] of interfaceBlocks) {
      if (!first) declareLines.push("");
      first = false;
      declareLines.push(`  interface ${iface} {`);
      declareLines.push(...members.map((l) => `${memberIndent}${l}`));
      declareLines.push("  }");
    }
    declareLines.push("}");
  } else {
    declareLines.push(`declare module "temporal-polyfill" {`);
    declareLines.push("  namespace Temporal {");
    let first = true;
    for (const [iface, members] of interfaceBlocks) {
      if (!first) declareLines.push("");
      first = false;
      declareLines.push(`    interface ${iface} {`);
      declareLines.push(...members.map((l) => `${memberIndent}${l}`));
      declareLines.push("    }");
    }
    declareLines.push("  }");
    declareLines.push("}");
  }

  // Generate prototype assignment
  const protoLines: string[] = [];

  if (isMultiExport) {
    generateMultiExportProto(functions, baseName, target, protoLines);
  } else {
    const func = functions[0];
    generateSingleExportProto(func, target, protoLines);
  }

  // Now resolve imports
  const allContent = [...declareLines, ...protoLines].join("\n");
  const importLines = resolveImports(allContent, baseName, isMultiExport, implPath, declareLines.join("\n"));

  // Assemble final output
  outputLines.push(...importLines);
  if (importLines.length > 0) outputLines.push("");

  // Emit type aliases that are defined locally in impl files
  if (allContent.includes("TimeZoneAndTime")) {
    outputLines.push(`type TimeZoneAndTime = Parameters<Temporal.PlainDate["toZonedDateTime"]>[0];`);
    outputLines.push("");
  }

  outputLines.push(...declareLines);
  outputLines.push("");
  outputLines.push(...protoLines);
  outputLines.push("");

  return outputLines.join("\n");
}

function getOverloadsForInterface(func: ParsedFunction, iface: string, target: TargetInfo): ParsedOverload[] {
  if (target.kind !== "array") {
    // Non-array: all overloads go to all interfaces
    return func.overloads;
  }

  // Array: classify overloads
  const result: ParsedOverload[] = [];
  for (const overload of func.overloads) {
    const kind = classifyArrayOverload(overload.signature);
    if (iface === "Array<T>" && (kind === "mutable" || kind === "both")) {
      result.push(overload);
    } else if (iface === "ReadonlyArray<T>" && (kind === "readonly" || kind === "both")) {
      result.push(overload);
    }
  }
  return result;
}

function generateSingleExportProto(func: ParsedFunction, target: TargetInfo, protoLines: string[]): void {
  const funcName = func.name;
  const isProperty = PROPERTY_NAMES.has(funcName);

  if (isProperty) {
    // Property getter: Object.defineProperty
    protoLines.push(`Object.defineProperty(${target.prototype}, "${funcName}", {`);
    protoLines.push("  enumerable: false,");
    if (target.kind === "array") {
      protoLines.push(`  get: function <T>(this: ${target.selfType}) {`);
    } else {
      protoLines.push(`  get: function (this: ${target.selfType}) {`);
    }
    protoLines.push(`    return ${funcName}(this);`);
    protoLines.push("  },");
    protoLines.push("});");
    return;
  }

  // Check if we need `as any` cast on the assignment (multiple overloads in interface)
  const arrayOverloads = target.kind === "array" ? getOverloadsForInterface(func, "Array<T>", target) : [];
  const needsCast = target.kind === "array" && arrayOverloads.length > 1;

  generateDirectAssignment(func, target, protoLines, needsCast);
}

function generateDirectAssignment(
  func: ParsedFunction,
  target: TargetInfo,
  protoLines: string[],
  needsCast = false,
): void {
  const funcName = func.name;
  // Build the prototype assignment from the implementation signature
  const implSig = func.implSignature || func.overloads[0]?.signature || "";

  // Parse the impl signature to build the prototype assignment
  const { params, generics, returnType } = parseSignature(implSig, funcName);

  // First param is self
  const selfParam = params[0];
  const restParams = params.slice(1);

  // Determine this type — for array prototypes, always use T[] (not readonly)
  let thisType = target.selfType;
  if (selfParam) {
    const selfType = selfParam
      .replace(/^\w+\s*:\s*/, "")
      .replace(/\s*=.*$/, "")
      .trim();
    thisType = target.kind === "array" ? selfType.replace(/^readonly\s+/, "") : selfType;
  }

  // Build generics for the prototype function
  const protoGenerics = generics;

  // Build param list for the function (including this:)
  // For temporal types, qualify BusinessDayOptions/WeekOptions/Interval with Temporal. prefix
  const qualifyType = (s: string) => qualifyTemporalTypes(s, target);

  const paramParts: string[] = [`this: ${thisType}`];
  for (const p of restParams) {
    // Replace CallbackFnEither with CallbackFn in prototype (mutable context)
    const param = p.replace(/CallbackFnEither/g, "CallbackFn");
    paramParts.push(qualifyType(param));
  }

  const argNames = restParams.map((p) => {
    const name = p
      .trim()
      .split(/[\s:?]/)[0]
      .replace("...", "");
    const isRest = p.trim().startsWith("...");
    return isRest ? `...${name}` : name;
  });

  // When needsCast, cast all args as `any` to bypass overload resolution issues
  const callArgParts = needsCast ? ["this", ...argNames.map((a) => `${a} as any`)] : ["this", ...argNames];
  let callArgs = callArgParts.join(", ");

  // Build return type (skip for needsCast — the `as any` on assignment handles interface compat)
  let retType = "";
  if (!needsCast) {
    let effectiveRetType = returnType || inferReturnType(funcName, target);
    // Strip readonly from return types for array targets
    if (target.kind === "array" && effectiveRetType.startsWith("readonly ")) {
      effectiveRetType = effectiveRetType.slice("readonly ".length);
    }
    retType = effectiveRetType ? `: ${qualifyType(effectiveRetType)}` : "";
  }

  // Special case: isWithin needs Interval cast (Temporal.Interval != Interval from impl)
  if (funcName === "isWithin" && target.temporalType) {
    const intervalArgName = argNames[0];
    if (intervalArgName) {
      callArgs = `this, ${intervalArgName} as Interval<${target.temporalType}>`;
    }
  }

  const funcCallExpr = `${funcName}(${callArgs})`;
  const closeBrace = needsCast ? "} as any;" : "};";

  if (target.declareStyle === "module") {
    protoLines.push(`${target.prototype}.${funcName} = function ${protoGenerics}(`);
    protoLines.push(`  ${paramParts.join(",\n  ")},`);
    protoLines.push(`)${retType} {`);
    protoLines.push(`  return ${funcCallExpr};`);
    protoLines.push(closeBrace);
  } else {
    // Single-line if short enough
    const paramsStr = paramParts.join(", ");
    const singleLine = `${target.prototype}.${funcName} = function ${protoGenerics}(${paramsStr})${retType} {`;

    if (singleLine.length <= 120) {
      protoLines.push(singleLine);
      protoLines.push(`  return ${funcCallExpr};`);
      protoLines.push(closeBrace);
    } else {
      protoLines.push(`${target.prototype}.${funcName} = function ${protoGenerics}(`);
      protoLines.push(`  ${paramParts.join(",\n  ")},`);
      protoLines.push(`)${retType} {`);
      protoLines.push(`  return ${funcCallExpr};`);
      protoLines.push(closeBrace);
    }
  }
}

function generateMultiExportProto(
  functions: ParsedFunction[],
  baseName: string,
  target: TargetInfo,
  protoLines: string[],
): void {
  // Determine if all are property getters or all are methods
  const allProperties = functions.every((f) => PROPERTY_NAMES.has(f.name));
  const allMethods = functions.every((f) => !PROPERTY_NAMES.has(f.name));

  if (allProperties) {
    protoLines.push(`Object.entries(${baseName}).forEach(([name, impl]) =>`);
    protoLines.push(`  Object.defineProperty(${target.prototype}, name, {`);
    protoLines.push("    enumerable: false,");
    protoLines.push(`    get: function (this: ${target.selfType}) {`);
    protoLines.push("      return impl(this);");
    protoLines.push("    },");
    protoLines.push("  }),");
    protoLines.push(");");
  } else if (allMethods) {
    protoLines.push(`Object.entries(${baseName}).forEach(`);
    protoLines.push(`  ([name, impl]) =>`);
    protoLines.push(`    (${target.prototype}[name] = function (this: ${target.selfType}) {`);
    protoLines.push("      return impl(this);");
    protoLines.push("    }),");
    protoLines.push(");");
  } else {
    // Mixed — shouldn't happen but handle it
    throw new Error(`Mixed property/method multi-export in ${baseName}`);
  }
}

// ─── Import resolution ──────────────────────────────────────────────────────

function resolveImports(
  code: string,
  baseName: string,
  isMultiExport: boolean,
  implPath: string,
  declareCode: string,
): string[] {
  const imports: string[] = [];
  const added = new Set<string>();

  function addImport(line: string) {
    if (!added.has(line)) {
      added.add(line);
      imports.push(line);
    }
  }

  // Side-effect imports first
  if (code.includes("BusinessDayOptions") || code.includes("WeekOptions")) {
    addImport(`import "src/temporal/types.global";`);
  }

  if (code.includes("Interval<") || code.includes("Interval.from")) {
    // Check if we need the Interval global import
    if (declareCode.includes("Interval<") || declareCode.includes("Interval.from")) {
      addImport(`import "src/temporal/interval/interval.global";`);
    }
  }

  // Check if we need the Interval impl import for the prototype section
  if (code.includes("as Interval<")) {
    addImport(`import { Interval } from "src/temporal/interval/interval.impl";`);
  }

  // Temporal import
  if (code.includes("Temporal")) {
    addImport(`import { Temporal } from "temporal-polyfill";`);
  }

  // Function import
  if (isMultiExport) {
    addImport(`import * as ${baseName} from "./${baseName}.impl";`);
  } else {
    const funcNames = parseFunctionNamesFromImpl(implPath);
    for (const name of funcNames) {
      addImport(`import { ${name} } from "./${baseName}.impl";`);
    }
  }

  // Type imports
  if (code.includes("CallbackFn<") && !code.includes("CallbackFnRO<") && !code.includes("CallbackFnEither<")) {
    addImport(`import { CallbackFn } from "src/array/utils";`);
  } else if (!code.includes("CallbackFn<") && code.includes("CallbackFnRO<")) {
    addImport(`import { CallbackFnRO } from "src/array/utils";`);
  } else if (code.includes("CallbackFn<") && code.includes("CallbackFnRO<")) {
    addImport(`import { CallbackFn, CallbackFnRO } from "src/array/utils";`);
  }

  if (code.includes("MaybePromise")) {
    addImport(`import { MaybePromise } from "src/utils";`);
  }
  if (code.includes("Comparable") || code.includes("KeysOfType")) {
    // Check exactly which ones
    const needComparable = code.includes("Comparable");
    const needKeysOfType = code.includes("KeysOfType");
    const utilImports: string[] = [];
    if (needComparable) utilImports.push("Comparable");
    if (needKeysOfType) utilImports.push("KeysOfType");
    // Check if MaybePromise is already being imported from utils
    if (code.includes("MaybePromise") && added.has(`import { MaybePromise } from "src/utils";`)) {
      // Merge
      added.delete(`import { MaybePromise } from "src/utils";`);
      utilImports.push("MaybePromise");
      const idx = imports.indexOf(`import { MaybePromise } from "src/utils";`);
      if (idx !== -1) imports.splice(idx, 1);
    }
    utilImports.sort();
    addImport(`import { ${utilImports.join(", ")} } from "src/utils";`);
  }

  if (code.includes("BusinessDayOptions") && !added.has(`import "src/temporal/types.global";`)) {
    addImport(`import "src/temporal/types.global";`);
  }

  // DayOfWeek type from temporal utils
  if (code.includes("DayOfWeek")) {
    addImport(`import { DayOfWeek } from "src/temporal/utils";`);
  }

  // Sort imports: side-effect first, then package, then src/, then local ./
  imports.sort((a, b) => {
    return importOrder(a) - importOrder(b) || a.localeCompare(b);
  });

  return imports;
}

function importOrder(imp: string): number {
  if (imp.startsWith('import "') || imp.startsWith("import '")) return 0; // side-effect
  if (imp.includes('"temporal-polyfill"')) return 1; // package
  if (imp.includes('"src/')) return 2; // src/ absolute
  return 3; // local ./
}

function parseFunctionNamesFromImpl(implPath: string): string[] {
  const content = fs.readFileSync(implPath, "utf-8");
  const names = new Set<string>();

  // Match export function name
  const funcMatches = content.matchAll(/export\s+(?:async\s+)?function\s+(\w+)/g);
  for (const m of funcMatches) names.add(m[1]);

  // Match export { name }
  const exportBrace = content.match(/export\s*\{\s*([^}]+)}/);
  if (exportBrace) {
    exportBrace[1]
      .split(",")
      .map((n) => n.trim())
      .forEach((n) => names.add(n));
  }

  return [...names];
}

function parseSignature(sig: string, _funcName: string): { params: string[]; generics: string; returnType: string } {
  let s = sig
    .replace(/^export\s+/, "")
    .replace(/^async\s+/, "")
    .replace(/^function\s+\w+/, "");

  let generics = "";
  if (s.startsWith("<")) {
    let depth = 0;
    let end = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "<") depth++;
      if (s[i] === ">") {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    generics = s.slice(0, end);
    s = s.slice(end);
  }

  const parenStart = s.indexOf("(");
  let depth = 0;
  let parenEnd = 0;
  for (let i = parenStart; i < s.length; i++) {
    if (s[i] === "(") depth++;
    if (s[i] === ")") {
      depth--;
      if (depth === 0) {
        parenEnd = i;
        break;
      }
    }
  }

  const paramsStr = s.slice(parenStart + 1, parenEnd);
  const after = s.slice(parenEnd + 1).trim();

  let returnType = "";
  const retMatch = after.match(/^:\s*(.+?)(?:\s*[{;]|$)/);
  if (retMatch) returnType = retMatch[1].trim();

  return { params: splitParams(paramsStr), generics, returnType };
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main(): void {
  const implFiles = discoverImplFiles();
  let allMatch = true;
  let count = 0;

  for (const impl of implFiles) {
    try {
      const generated = generateGlobal(impl);

      if (CHECK_MODE) {
        if (fs.existsSync(impl.globalPath)) {
          const existing = fs.readFileSync(impl.globalPath, "utf-8");
          if (existing !== generated) {
            console.error(`MISMATCH: ${path.relative(SRC_DIR, impl.globalPath)}`);
            allMatch = false;
          }
        } else {
          console.error(`MISSING: ${path.relative(SRC_DIR, impl.globalPath)}`);
          allMatch = false;
        }
      } else {
        fs.writeFileSync(impl.globalPath, generated);
        console.log(`Generated: ${path.relative(SRC_DIR, impl.globalPath)}`);
        count++;
      }
    } catch (e) {
      console.error(`Error processing ${path.relative(SRC_DIR, impl.implPath)}: ${e}`);
      if (!CHECK_MODE) throw e;
      allMatch = false;
    }
  }

  if (CHECK_MODE) {
    if (allMatch) {
      console.log("All globals are up to date.");
      process.exit(0);
    } else {
      console.error("\nGlobals are out of date. Run `yarn tsx scripts/generate-globals.ts` to regenerate.");
      process.exit(1);
    }
  } else {
    console.log(`\nGenerated ${count} global files.`);
  }
}

main();
