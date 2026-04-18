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
import * as prettier from "prettier";
import { getOrCreate } from "src/map/getOrCreate/getOrCreate.impl";
import { FunctionDeclaration, Project, ScriptTarget, SourceFile, SyntaxKind } from "ts-morph";

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

interface ParsedParam {
  name: string;
  typeText: string;
  isRest: boolean;
  hasInitializer: boolean;
  /** The full source text of the parameter (e.g. "arr: readonly T[]" or "options: BusinessDayOptions = {}") */
  fullText: string;
}

interface ParsedOverload {
  jsdoc: string[];
  typeParams: string[];
  params: ParsedParam[];
  returnType: string;
  isAsync: boolean;
}

interface ParsedFunction {
  name: string;
  overloads: ParsedOverload[];
  impl: ParsedOverload;
}

// ─── Target classification ───────────────────────────────────────────────────

/**
 * Maps an impl file path to the metadata describing where its methods attach.
 *
 * The top-level directory under `src/` determines the target: `array/` attaches
 * to `Array.prototype`, `map/` to `Map.prototype`, each `temporal/*` subdir to
 * the corresponding `Temporal.*` interface.
 */
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
  } else if (rel.startsWith("map/")) {
    return {
      kind: "map",
      interfaces: ["Map<K, V>"],
      interfaceGenerics: "<K, V>",
      prototype: "Map.prototype",
      declareStyle: "global",
      selfType: "Map<K, V>",
    };
  } else if (rel.startsWith("temporal/plainDate/")) {
    return {
      kind: "plainDate",
      interfaces: ["PlainDate"],
      interfaceGenerics: "",
      prototype: "Temporal.PlainDate.prototype",
      declareStyle: "module",
      selfType: "Temporal.PlainDate",
      temporalType: "Temporal.PlainDate",
    };
  } else if (rel.startsWith("temporal/zonedDateTime/")) {
    return {
      kind: "zonedDateTime",
      interfaces: ["ZonedDateTime"],
      interfaceGenerics: "",
      prototype: "Temporal.ZonedDateTime.prototype",
      declareStyle: "module",
      selfType: "Temporal.ZonedDateTime",
      temporalType: "Temporal.ZonedDateTime",
    };
  } else if (rel.startsWith("temporal/legacyDate/")) {
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

/**
 * Finds every `*.impl.ts` under `src/{array,map,temporal/*}/ * / *.impl.ts`
 * and pairs each with its sibling `.global.ts` output path plus target metadata.
 */
function discoverImplFiles(): ImplFile[] {
  const temporalDirs = ["plainDate", "zonedDateTime", "legacyDate"].map((dir) => path.join("temporal", dir));
  const globPath = path.join(SRC_DIR, `{${["array", "map", ...temporalDirs].join(",")}}`, `*/*.impl.ts`);
  return fs.globSync(globPath).map((implPath) => ({
    implPath,
    globalPath: implPath.replace(/\.impl\.ts$/, ".global.ts"),
    target: classifyTarget(implPath),
  }));
}

// ─── Parsing (ts-morph) ─────────────────────────────────────────────────────

/**
 * Pulls JSDoc, type parameters, parameter list, return type, and async flag off
 * a single ts-morph `FunctionDeclaration` node. Used for both overload signatures
 * (no body) and implementation signatures (with body). Throws if no explicit
 * return type is present — impls must be annotated so the global signature can
 * be derived without type inference.
 */
function extractOverloadFromDecl(fn: FunctionDeclaration): ParsedOverload {
  const jsdocNodes = fn.getJsDocs();
  const jsdoc: string[] = [];
  for (const doc of jsdocNodes) {
    jsdoc.push(...doc.getFullText().split("\n"));
  }

  const typeParams = fn.getTypeParameters().map((tp) => tp.getText());

  const params: ParsedParam[] = fn.getParameters().map((p) => {
    const name = p.getName();
    const isRest = p.isRestParameter();
    const hasInitializer = p.hasInitializer();
    const typeNode = p.getTypeNode();
    const typeText = typeNode ? typeNode.getText() : "";
    // Build fullText to match the original source representation
    let fullText = "";
    if (isRest) fullText += "...";
    fullText += name;
    if (p.hasQuestionToken()) fullText += "?";
    if (typeText) fullText += `: ${typeText}`;
    if (hasInitializer) fullText += ` = ${p.getInitializer()!.getText()}`;
    return { name, typeText, isRest, hasInitializer, fullText };
  });

  const retNode = fn.getReturnTypeNode();
  if (!retNode) {
    const loc = `${fn.getSourceFile().getFilePath()}:${fn.getStartLineNumber()}`;
    throw new Error(`${fn.getName() ?? "<anon>"} at ${loc} is missing an explicit return type`);
  }
  const returnType = retNode.getText();

  const isAsync = fn.isAsync();

  return { jsdoc, typeParams, params, returnType, isAsync };
}

/**
 * Parses an impl source file into a list of `ParsedFunction` records, one per
 * exported function. Each record carries the implementation signature plus any
 * overload signatures that precede it.
 *
 * Only functions that are either directly exported (`export function foo()`) or
 * re-exported by name (`export { foo }`) are included.
 *
 * Note: ts-morph's `getFunctions()` returns only implementation declarations
 * (the one with a body). Overload signatures are accessed separately via
 * `fn.getOverloads()`.
 */
function parseImplFile(sourceFile: SourceFile): ParsedFunction[] {
  // Collect names from `export { name }` declarations
  const exportedNames = new Set<string>(
    sourceFile
      .getExportDeclarations()
      .flatMap((exportDecl) => exportDecl.getNamedExports())
      .map((namedExport) => namedExport.getName()),
  );

  // getFunctions() returns only implementation declarations (with body).
  // Overloads are accessed via fn.getOverloads().
  const functions: ParsedFunction[] = sourceFile
    .getFunctions()
    .values()
    .filter((fn) => fn.hasBody())
    .filter((fn) => fn.getName())
    .filter((fn) => fn.isExported() || exportedNames.has(fn.getName()!))
    .map((fn) => {
      const name = fn.getName()!;

      const impl = extractOverloadFromDecl(fn);
      const overloadDecls = fn.getOverloads();
      const overloads: ParsedOverload[] =
        overloadDecls.length > 0
          ? overloadDecls.map((d) => extractOverloadFromDecl(d))
          : // No overloads: treat the impl as the single overload (with its own jsdoc)
            [{ ...impl }];

      return { name, overloads, impl };
    })
    .toArray();

  return functions;
}

// ─── Overload classification (array only) ────────────────────────────────────

type ArrayOverloadKind = "mutable" | "readonly" | "both";

/**
 * Determines which `Array` interface(s) an overload belongs on, based solely on
 * which `CallbackFn*` variant appears in its parameter types. Callers use this
 * to partition overloads between the `Array<T>` and `ReadonlyArray<T>` declare
 * blocks.
 *
 * @example
 * // compact uses CallbackFnEither → usable from both
 * classifyArrayOverload({ params: [{ typeText: "readonly T[]" }], ... });
 * //=> "both"
 * @example
 * // groupBy mutable overload uses CallbackFn
 * classifyArrayOverload({ params: [{ typeText: "T[]" }, { typeText: "CallbackFn<T, K>" }], ... });
 * //=> "mutable"
 * @example
 * // groupBy readonly overload uses CallbackFnRO
 * classifyArrayOverload({ params: [{ typeText: "readonly T[]" }, { typeText: "CallbackFnRO<T, K>" }], ... });
 * //=> "readonly"
 */
function classifyArrayOverload(overload: ParsedOverload): ArrayOverloadKind {
  // Check all param type texts for CallbackFn variants
  const allParamText = overload.params.map((p) => p.typeText).join(" ");
  if (
    allParamText.includes("CallbackFn<") &&
    !allParamText.includes("CallbackFnRO<") &&
    !allParamText.includes("CallbackFnEither<")
  ) {
    return "mutable";
  } else if (allParamText.includes("CallbackFnRO<")) {
    return "readonly";
  } else {
    return "both";
  }
}

// ─── Signature transformation ────────────────────────────────────────────────

/**
 * Rewrites a standalone function signature into a prototype method signature
 * for a specific interface declaration.
 *
 * The transformation:
 * 1. Drops the first parameter (it becomes `this` on the interface)
 * 2. Strips generics that the interface already provides (e.g. `T` on `Array<T>`, `K`/`V` on `Map<K, V>`)
 * 3. For array targets, bridges readonly-ness between `Array<T>` and `ReadonlyArray<T>` via a `this:` constraint
 * 4. Converts default-valued params into optional params (interface can't have defaults)
 * 5. Emits property-style for names in `PROPERTY_NAMES`, method-style otherwise
 *
 * @example
 * // Standalone: function compact<T>(arr: readonly T[]): T[]
 * transformSignatureForGlobal(compactOverload, "compact", arrayTarget, "Array<T>");
 * //=> { methodSig: "compact(this: T[]): T[];", ... }
 * @example
 * // Standalone: function getOrCreate<K, V>(map: Map<K, V>, key: K, make: () => V): V
 * transformSignatureForGlobal(getOrCreateOverload, "getOrCreate", mapTarget, "Map<K, V>");
 * //=> { methodSig: "getOrCreate(key: K, make: () => V): V;", ... }
 * @example
 * // Property-style (first is in PROPERTY_NAMES): function first<T>(arr: readonly T[]): T | undefined
 * transformSignatureForGlobal(firstOverload, "first", arrayTarget, "Array<T>");
 * //=> { methodSig: "readonly first: T | undefined;", ... }
 */
function transformSignatureForGlobal(
  overload: ParsedOverload,
  funcName: string,
  target: TargetInfo,
  forInterface: string,
): { methodSig: string; needsThisConstraint: boolean; thisType: string } {
  // Remove first param (becomes `this`)
  const firstParam = overload.params[0];
  const restParams = overload.params.slice(1);

  // Extract the first param type for this constraint detection
  const firstParamType = firstParam ? firstParam.typeText : target.selfType;

  // Strip generics from method that the interface provides
  let methodTypeParams = [...overload.typeParams];
  if (target.kind === "array") {
    methodTypeParams = methodTypeParams.filter((tp) => tp.split(/\s+/)[0] !== "T");
  } else if (target.kind === "map") {
    methodTypeParams = methodTypeParams.filter((tp) => {
      const name = tp.split(/\s+/)[0];
      return name !== "K" && name !== "V";
    });
  }
  const methodGenerics = methodTypeParams.length > 0 ? `<${methodTypeParams.join(", ")}>` : "";

  // Check if we need a this constraint
  const needsThisConstraint = target.kind === "array" && restParams.length === 0 && !isGenericArrayType(firstParamType);

  let thisType = firstParamType;

  if (forInterface === "Array<T>" && needsThisConstraint) {
    thisType = thisType.replace(/^readonly\s+/, "");
  } else if (forInterface === "ReadonlyArray<T>" && needsThisConstraint && !thisType.startsWith("readonly ")) {
    thisType = "readonly " + thisType;
  }

  // Build method signature
  const isProperty = PROPERTY_NAMES.has(funcName);

  // Strip readonly from return types for array targets
  let effectiveReturnType = overload.returnType;
  if (target.kind === "array" && effectiveReturnType.startsWith("readonly ")) {
    effectiveReturnType = effectiveReturnType.slice("readonly ".length);
  }

  if (isProperty) {
    return {
      methodSig: `readonly ${funcName}: ${effectiveReturnType};`,
      needsThisConstraint: false,
      thisType,
    };
  }

  // Convert default values to optional params
  const interfaceParams = restParams.map((p) => (p.hasInitializer ? `${p.name}?: ${p.typeText}` : p.fullText));

  const paramsString = interfaceParams.join(", ");

  const methodSig = needsThisConstraint
    ? `${funcName}${methodGenerics}(this: ${thisType}): ${effectiveReturnType};`
    : `${funcName}${methodGenerics}(${paramsString}): ${effectiveReturnType};`;

  return { methodSig, needsThisConstraint, thisType };
}

/**
 * True when the type text is exactly the generic array placeholder `T[]` (or
 * the readonly flavor). Used by `transformSignatureForGlobal` to decide whether
 * an array overload is generic enough to rely on the interface's `T`, or
 * whether it's a concrete type (like `number[]`) that needs a narrowing
 * `this:` constraint.
 *
 * @example
 * isGenericArrayType("T[]");          //=> true
 * isGenericArrayType("readonly T[]"); //=> true
 * isGenericArrayType("number[]");     //=> false
 * isGenericArrayType("T");            //=> false
 */
function isGenericArrayType(type: string): boolean {
  const stripped = type.replace(/^readonly\s+/, "");
  return stripped === "T[]" || stripped === "readonly T[]";
}

/**
 * Prefixes bare temporal type references with `Temporal.` so they resolve
 * correctly outside a `declare module "temporal-polyfill"` block.
 *
 * Inside the temporal module declaration, `Temporal` is the enclosing
 * namespace and names like `BusinessDayOptions` resolve directly. Once we
 * leave that block (e.g. in the prototype assignment below it), the same
 * names need the `Temporal.` prefix to resolve.
 *
 * No-op for non-temporal targets (whose code never leaves global scope).
 *
 * @example
 * // target: plainDate
 * qualifyTemporalTypes("options: BusinessDayOptions = {}", plainDateTarget);
 * //=> "options: Temporal.BusinessDayOptions = {}"
 * @example
 * // already qualified — left alone
 * qualifyTemporalTypes("Temporal.BusinessDayOptions", plainDateTarget);
 * //=> "Temporal.BusinessDayOptions"
 * @example
 * // array target — no-op
 * qualifyTemporalTypes("options: BusinessDayOptions", arrayTarget);
 * //=> "options: BusinessDayOptions"
 */
function qualifyTemporalTypes(s: string, target: TargetInfo): string {
  if (target.declareStyle !== "module") return s;
  return s.replace(/(?<!Temporal\.)(?<!\w)(BusinessDayOptions|WeekOptions|Interval<)/g, "Temporal.$1");
}

// ─── JSDoc transformation ────────────────────────────────────────────────────

/**
 * Rewrites an impl-style JSDoc block into a method-style JSDoc block suitable
 * for a prototype interface declaration.
 *
 * Pipeline:
 * 1. Strip the outer `/** ... * /` wrappers to get plain body lines
 * 2. Remove the first `@param` (it described the receiver, now implicit as `this`)
 * 3. Strip `- ` dashes from remaining `@param` tags (`@param x - desc` → `@param x desc`)
 * 4. Rewrite descriptions: "a/An <subject>" → "the/The <subject>" for the target's canonical noun
 * 5. Rewrite `@example` call syntax from `fn(arr, x)` to `arr.fn(x)` (see `transformSingleExample`)
 * 6. Re-wrap with `/** ... * /`
 *
 * @example
 * // For `groupBy` on arrays:
 * transformJsdoc([
 *   "/** Groups an array by key.",
 *   " * @param arr - the array",
 *   " * @param fn - the key fn",
 *   " * @returns a Map",
 *   " * @example groupBy([1, 2], x => x > 1) //=> Map{false => [1], true => [2]}",
 *   " * /",
 * ], "groupBy", arrayTarget, rewriteableNames);
 * //=> [
 * //  "/**",
 * //  " * Groups the array by key.",
 * //  " * @param fn the key fn",
 * //  " * @returns a Map",
 * //  " * @example [1, 2].groupBy(x => x > 1) //=> Map{false => [1], true => [2]}",
 * //  " * /",
 * // ]
 */
function transformJsdoc(
  jsdocLines: string[],
  funcName: string,
  target: TargetInfo,
  rewriteableNames: Set<string>,
): string[] {
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
  bodyLines = transformExamples(bodyLines, funcName, target, rewriteableNames);

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

/**
 * Removes the first `@param` tag (and any continuation lines that belong to it)
 * from a JSDoc body. Used because the standalone function's first parameter
 * becomes `this` on the prototype method and no longer needs documenting.
 *
 * A continuation runs from the `@param` line until the next `@` tag, blank
 * line, or end of the body.
 *
 * @example
 * removeFirstParam([
 *   "Groups an array by key.",
 *   "@param arr the array to group",
 *   "@param fn the key function",
 *   "@returns a grouped Map",
 * ]);
 * //=> ["Groups an array by key.", "@param fn the key function", "@returns a grouped Map"]
 * @example
 * // Continuation line — still belongs to the @param, so it's removed too
 * removeFirstParam([
 *   "@param arr the array",
 *   "  (must be non-empty)",
 *   "@returns something",
 * ]);
 * //=> ["@returns something"]
 */
function removeFirstParam(lines: string[]): string[] {
  const startIndex = lines.findIndex((line) => line.startsWith("@param"));
  if (startIndex === -1) return lines;
  let endOffset = lines.slice(startIndex + 1).findIndex((line) => line.startsWith("@") || line === "");
  if (endOffset === -1) endOffset = lines.length - startIndex - 1;
  return lines.toSpliced(startIndex, endOffset + 1);
}

/**
 * The canonical noun for each target kind's subject. JSDoc in the impl files is
 * standardized to use this word (e.g. plainDate impls always say "a PlainDate",
 * not "a date" or "a given date"); the replacement below flips "a/An X" →
 * "the/The X" so the generated method docs read naturally in method-call
 * context ("Returns the start of a month for the PlainDate.").
 */
const SUBJECT_NOUN: Record<TargetKind, string> = {
  array: "array",
  map: "Map",
  plainDate: "PlainDate",
  zonedDateTime: "ZonedDateTime",
  legacyDate: "legacy Date",
};

/**
 * Rewrites "a/An <subject>" to "the/The <subject>" for the target's canonical
 * noun, so impl docs ("Returns the start of a month for a PlainDate.") read
 * naturally when the same text lives on a method and the receiver is implicit
 * ("Returns the start of a month for the PlainDate.").
 *
 * Only the canonical noun defined in `SUBJECT_NOUN` is rewritten — other "a/an"
 * occurrences are left alone.
 *
 * @example
 * transformDescription("Returns the start of a month for a PlainDate.", plainDateTarget);
 * //=> "Returns the start of a month for the PlainDate."
 * @example
 * transformDescription("Groups an array by key.", arrayTarget);
 * //=> "Groups the array by key."
 * @example
 * // Non-subject "a" — untouched
 * transformDescription("Returns a new Map.", mapTarget);
 * //=> "Returns a new Map." (only "a Map" standalone would be rewritten)
 */
function transformDescription(line: string, target: TargetInfo): string {
  const word = SUBJECT_NOUN[target.kind];
  return line
    .replace(new RegExp(`\\ba\\s+${word}\\b`, "g"), `the ${word}`)
    .replace(new RegExp(`\\bA\\s+${word}\\b`, "g"), `The ${word}`);
}

/**
 * Walks a JSDoc body and rewrites each `@example` block so function calls
 * appear in method form. Multi-line examples are collapsed to a single line
 * with runs of whitespace normalized to a single space — inline examples are
 * the project convention.
 *
 * Delegates the actual call-site rewriting to `transformSingleExample`.
 *
 * @example
 * transformExamples([
 *   "Compacts an array.",
 *   "@example compact([1, null, 2]) //=> [1, 2]",
 *   "@example compact([null]) //=> []",
 * ], "compact", arrayTarget, new Set(["compact"]));
 * //=> [
 * //  "Compacts an array.",
 * //  "@example [1, null, 2].compact() //=> [1, 2]",
 * //  "@example [null].compact() //=> []",
 * // ]
 * @example
 * // Multi-line example collapses to one line
 * transformExamples([
 *   "@example const grouped = groupBy([1, 2, 3], x => x > 1);",
 *   "  //=> Map{false => [1], true => [2, 3]}",
 * ], "groupBy", arrayTarget, new Set(["groupBy"]));
 * //=> ["@example const grouped = [1, 2, 3].groupBy(x => x > 1); //=> Map{false => [1], true => [2, 3]}"]
 */
function transformExamples(
  lines: string[],
  funcName: string,
  target: TargetInfo,
  rewriteableNames: Set<string>,
): string[] {
  let i = lines.findIndex((line) => line.startsWith("@example"));
  let result: string[] = i === -1 ? lines.slice() : [];
  while (i !== -1) {
    result = result.concat(lines.slice(0, i));
    lines = lines.slice(i);
    const line = lines.shift()!;
    const offset = lines.findIndex((l) => l.startsWith("@"));
    const end = offset === -1 ? lines.length : offset;
    const body = [line.replace("@example", "").trim(), ...lines.slice(0, end)].filter(Boolean);
    lines = lines.slice(end);
    const transformed = transformSingleExample(body, funcName, target, rewriteableNames);
    result.push(`@example ${transformed.join(" ").replace(/\s+/g, " ").trim()}`);
    i = lines.findIndex((line) => line.startsWith("@example"));
  }
  return result;
}

/** Reusable ts-morph project for parsing example snippets. */
const exampleProject = new Project({ useInMemoryFileSystem: true });

/**
 * Rewrites function calls in a JSDoc example to method/property form:
 *   `foo(arr, x)`        →  `arr.foo(x)`
 *   `isEmpty(arr)`       →  `arr.isEmpty`           (when fn is a property)
 * Only top-level identifier calls (not member-access) for names in
 * `rewriteableNames` are touched. Examples are wrapped in an async function so
 * top-level `await` and multi-statement bodies parse cleanly.
 */
function transformSingleExample(
  exampleLines: string[],
  funcName: string,
  _target: TargetInfo,
  rewriteableNames: Set<string>,
): string[] {
  const text = exampleLines.join("\n");
  // Wrap in an async function so top-level `await` and multi-statement example
  // bodies (e.g. `const arr = [...]; remove(arr, 2);`) parse without errors.
  const wrapper = "async function _w() {\n";
  const sf = exampleProject.createSourceFile("__example.ts", `${wrapper}${text}\n}`, { overwrite: true });

  const isProperty = PROPERTY_NAMES.has(funcName);

  // Mutate innermost calls first by repeatedly finding a match and re-collecting,
  // so an outer call's first-arg text reflects the already-rewritten inner.
  while (true) {
    const calls = sf.getDescendantsOfKind(SyntaxKind.CallExpression);
    // Process in reverse document order: inner calls appear after their parents.
    const target = [...calls].reverse().find((c) => {
      const callee = c.getExpression();
      return callee.getKind() === SyntaxKind.Identifier && rewriteableNames.has(callee.getText());
    });
    if (!target) break;
    const name = target.getExpression().getText();
    const args = target.getArguments();
    if (args.length === 0) break;
    const firstArg = args[0].getText();
    const restArgs = args
      .slice(1)
      .map((a) => a.getText())
      .join(", ");
    const rewriteAsProperty = isProperty || PROPERTY_NAMES.has(name);
    const replacement = rewriteAsProperty
      ? `${firstArg}.${name}`
      : restArgs
        ? `${firstArg}.${name}(${restArgs})`
        : `${firstArg}.${name}()`;
    target.replaceWithText(replacement);
  }

  // Slice the body text out of the wrapped source — using full text preserves
  // line comments like `//=> result` that getBodyText() drops as trailing trivia.
  const full = sf.getFullText();
  const bodyStart = full.indexOf("{") + 1;
  const bodyEnd = full.lastIndexOf("}");
  return full
    .slice(bodyStart, bodyEnd)
    .replace(/^\n|\n$/g, "")
    .split("\n");
}

// ─── Code generation ─────────────────────────────────────────────────────────

/**
 * Orchestrates generation of a single `.global.ts` file from an `.impl.ts` file.
 *
 * Output structure:
 * 1. Imports (resolved by `resolveImports` from the generated content)
 * 2. Optional local type aliases (e.g. `TimeZoneAndTime` for plainDate)
 * 3. `declare global { ... }` or `declare module "temporal-polyfill" { ... }` block
 * 4. Prototype assignment(s)
 *
 * Single-export impls emit a direct `Proto.method = function...` assignment.
 * Multi-export impls emit an `Object.entries(...).forEach(...)` loop.
 *
 * @example
 * // Input: src/array/compact/compact.impl.ts with `export function compact<T>(arr: readonly T[]): T[]`
 * // Output (roughly):
 * //   import { compact } from "./compact.impl";
 * //
 * //   declare global {
 * //     interface Array<T> {
 * //       compact(this: T[]): T[];
 * //     }
 * //     interface ReadonlyArray<T> {
 * //       compact(this: readonly T[]): T[];
 * //     }
 * //   }
 * //
 * //   Array.prototype.compact = function <T>(this: T[]): T[] {
 * //     return compact(this);
 * //   };
 */
function generateGlobal(impl: ImplFile, sourceFile: SourceFile): string {
  const { implPath, target } = impl;
  const functions = parseImplFile(sourceFile);
  const baseName = path.basename(implPath, ".impl.ts");

  // Determine if multi-export
  const isMultiExport = functions.length > 1;
  const allFuncNames = new Set(functions.map((f) => f.name));

  // Generate the file
  const outputLines: string[] = [];

  // Generate interface declarations
  const interfaceBlocks: Map<string, string[]> = new Map();

  if (isMultiExport) {
    for (const iface of target.interfaces) {
      const members: string[] = [];
      for (const func of functions) {
        for (const overload of func.overloads) {
          const jsdoc = transformJsdoc(overload.jsdoc, func.name, target, allFuncNames);
          const transformed = transformSignatureForGlobal(overload, func.name, target, iface);

          if (jsdoc.length > 0) {
            members.push(...jsdoc);
          }
          members.push(transformed.methodSig);
        }
      }
      interfaceBlocks.set(iface, members);
    }
  } else {
    const func = functions[0];
    if (!func) {
      throw new Error(`No functions found in ${implPath}`);
    }

    for (const iface of target.interfaces) {
      const members: string[] = [];

      const overloadsForInterface = getOverloadsForInterface(func, iface, target);

      for (const overload of overloadsForInterface) {
        const jsdoc = transformJsdoc(overload.jsdoc, func.name, target, new Set([func.name]));
        const transformed = transformSignatureForGlobal(overload, func.name, target, iface);

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
  const importLines = resolveImports(allContent, baseName, isMultiExport, declareLines.join("\n"));

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

/**
 * Filters a function's overloads down to the ones that belong on a specific
 * interface (`Array<T>` vs `ReadonlyArray<T>`). Non-array targets don't split
 * overloads, so all overloads pass through unchanged.
 */
function getOverloadsForInterface(func: ParsedFunction, iface: string, target: TargetInfo): ParsedOverload[] {
  if (target.kind !== "array") {
    return func.overloads;
  }

  const result: ParsedOverload[] = [];
  for (const overload of func.overloads) {
    const kind = classifyArrayOverload(overload);
    if (iface === "Array<T>" && (kind === "mutable" || kind === "both")) {
      result.push(overload);
    } else if (iface === "ReadonlyArray<T>" && (kind === "readonly" || kind === "both")) {
      result.push(overload);
    }
  }
  return result;
}

/**
 * Emits the prototype assignment for an impl file that exports a single
 * function. Branches on:
 * - Property-style (name in `PROPERTY_NAMES`) → `Object.defineProperty` with getter
 * - Multi-overload arrays → direct assignment with `as any` cast to bypass resolution
 * - Everything else → plain direct assignment via `generateDirectAssignment`
 */
function generateSingleExportProto(func: ParsedFunction, target: TargetInfo, protoLines: string[]): void {
  const funcName = func.name;
  const isProperty = PROPERTY_NAMES.has(funcName);

  if (isProperty) {
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

  const arrayOverloads = target.kind === "array" ? getOverloadsForInterface(func, "Array<T>", target) : [];
  const needsCast = target.kind === "array" && arrayOverloads.length > 1;

  generateDirectAssignment(func, target, protoLines, needsCast);
}

/**
 * Emits a `Proto.method = function (...) { return impl(this, ...); }` assignment.
 *
 * Behavior details:
 * - First impl parameter is dropped; `this` takes its place and is forwarded as the first arg
 * - Rest parameters (`...args`) are forwarded with their spread preserved
 * - For array targets, the return type is un-`readonly`'d (prototype methods on
 *   `Array.prototype` always hand back mutable arrays)
 * - `CallbackFnEither` is narrowed to `CallbackFn` (we're in mutable-array context)
 * - `needsCast = true` emits `this` plus `arg as any` casts and trails with `} as any;`
 *   to sidestep TypeScript's overload resolution when an array fn has multiple
 *   `Array<T>`-facing overloads
 * - Long signatures break onto multiple lines (>120 chars) for readability
 *
 * @example
 * // Standalone: function compact<T>(arr: readonly T[]): T[]
 * // Emits:
 * //   Array.prototype.compact = function <T>(this: T[]): T[] {
 * //     return compact(this);
 * //   };
 * @example
 * // Standalone: function batched<T>(arr: readonly T[], size: number): T[][]
 * // Emits:
 * //   Array.prototype.batched = function <T>(this: T[], size: number): T[][] {
 * //     return batched(this, size);
 * //   };
 * @example
 * // With needsCast (e.g. `sortBy` with both sync and async overloads):
 * //   Array.prototype.sortBy = function <T, K>(this: T[], fn: any) {
 * //     return sortBy(this, fn as any);
 * //   } as any;
 */
function generateDirectAssignment(
  func: ParsedFunction,
  target: TargetInfo,
  protoLines: string[],
  needsCast = false,
): void {
  const funcName = func.name;
  const impl = func.impl;

  // First param is self
  const selfParam = impl.params[0];
  const restParams = impl.params.slice(1);

  // Determine this type — for array prototypes, always use T[] (not readonly)
  let thisType = target.selfType;
  if (selfParam) {
    const selfType = selfParam.typeText;
    thisType = target.kind === "array" ? selfType.replace(/^readonly\s+/, "") : selfType;
  }

  // Build generics for the prototype function
  const protoGenerics = impl.typeParams.length > 0 ? `<${impl.typeParams.join(", ")}>` : "";

  // For temporal types, qualify BusinessDayOptions/WeekOptions/Interval with Temporal. prefix
  const qualifyType = (s: string) => qualifyTemporalTypes(s, target);

  const paramParts: string[] = [`this: ${thisType}`];
  for (const p of restParams) {
    // Replace CallbackFnEither with CallbackFn in prototype (mutable context)
    const paramText = p.fullText.replace(/CallbackFnEither/g, "CallbackFn");
    paramParts.push(qualifyType(paramText));
  }

  const argNames = restParams.map((p) => {
    return p.isRest ? `...${p.name}` : p.name;
  });

  // When needsCast, cast all args as `any` to bypass overload resolution issues
  const callArgParts = needsCast ? ["this", ...argNames.map((a) => `${a} as any`)] : ["this", ...argNames];
  let callArgs = callArgParts.join(", ");

  // Build return type (skip for needsCast)
  let retType = "";
  if (!needsCast) {
    let effectiveRetType = impl.returnType;
    if (target.kind === "array" && effectiveRetType.startsWith("readonly ")) {
      effectiveRetType = effectiveRetType.slice("readonly ".length);
    }
    retType = `: ${qualifyType(effectiveRetType)}`;
  }

  // Special case: isWithin needs Interval cast
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

/**
 * Emits a prototype-installing loop for impl files that export multiple
 * functions (e.g. `toEntries`, `toKeys`, `toValues` all living in one impl).
 *
 * Requires every exported fn to share a shape — either all properties or all
 * methods — so one loop works for the whole module. Mixed property/method
 * multi-exports throw.
 *
 * @example
 * // Input: src/object/toEntries/toEntries.impl.ts with `export function toEntries(obj)` +
 * //        similar `toKeys`, `toValues`
 * // Emits (as methods):
 * //   Object.entries(toEntries).forEach(
 * //     ([name, impl]) =>
 * //       (Object.prototype[name] = function (this: object) {
 * //         return impl(this);
 * //       }),
 * //   );
 * @example
 * // All properties (like the `isMonday`...`isSunday` day-of-week group):
 * //   Object.entries(isDayOfWeek).forEach(([name, impl]) =>
 * //     Object.defineProperty(Temporal.PlainDate.prototype, name, {
 * //       enumerable: false,
 * //       get: function (this: Temporal.PlainDate) {
 * //         return impl(this);
 * //       },
 * //     }),
 * //   );
 */
function generateMultiExportProto(
  functions: ParsedFunction[],
  baseName: string,
  target: TargetInfo,
  protoLines: string[],
): void {
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
    throw new Error(`Mixed property/method multi-export in ${baseName}`);
  }
}

// ─── Import resolution ──────────────────────────────────────────────────────

/** Pattern → import mapping. Entries without `name` produce side-effect imports. */
const IMPORT_PATTERNS: { pattern: string; path: string; name?: string; declare?: boolean }[] = [
  // Side-effect imports
  { pattern: "BusinessDayOptions", path: "src/temporal/types.global" },
  { pattern: "WeekOptions", path: "src/temporal/types.global" },
  // Interval side-effect import (only when Interval appears in the declare block)
  { pattern: "Interval<", path: "src/temporal/interval/interval.global", declare: true },
  // Named imports
  { pattern: "as Interval<", path: "src/temporal/interval/interval.impl", name: "Interval" },
  { pattern: "Temporal", path: "temporal-polyfill", name: "Temporal" },
  { pattern: "CallbackFn<", path: "src/array/utils", name: "CallbackFn" },
  { pattern: "CallbackFnRO<", path: "src/array/utils", name: "CallbackFnRO" },
  { pattern: "MaybePromise", path: "src/utils", name: "MaybePromise" },
  { pattern: "Comparable", path: "src/utils", name: "Comparable" },
  { pattern: "KeysOfType", path: "src/utils", name: "KeysOfType" },
  { pattern: "DayOfWeek", path: "src/temporal/utils", name: "DayOfWeek" },
];

/**
 * Scans the generated code for known patterns (type names, callback markers,
 * etc.) and produces the matching import lines. Always adds an import from the
 * sibling `.impl` file — named for single-export impls, `* as <baseName>` for
 * multi-export.
 *
 * `declareCode` is the declare block alone; a few patterns (like `Interval<`)
 * only trigger a side-effect import when they appear in the declare block,
 * not when they appear in the prototype assignment.
 *
 * Prettier's `organize-imports` plugin runs after this and re-sorts lines, so
 * emit order here doesn't matter.
 *
 * @example
 * // Code contains `CallbackFn<` and `BusinessDayOptions`, baseName = "addBusinessDays"
 * // Emits (pre-prettier):
 * //   import "src/temporal/types.global";
 * //   import { CallbackFn } from "src/array/utils";
 * //   import { Temporal } from "temporal-polyfill";
 * //   import { addBusinessDays } from "./addBusinessDays.impl";
 * @example
 * // Multi-export module (baseName = "toEntries", isMultiExport = true):
 * //   import * as toEntries from "./toEntries.impl";
 */
function resolveImports(code: string, baseName: string, isMultiExport: boolean, declareCode: string): string[] {
  // Map from import path → set of named imports (empty set = side-effect import)
  const importMap = new Map<string, Set<string>>();

  function addImport(importPath: string, name?: string) {
    const set = getOrCreate(importMap, importPath, () => new Set());
    if (name) set.add(name);
  }

  // Pattern-driven imports
  IMPORT_PATTERNS.filter(({ declare, pattern }) => (declare ? declareCode : code).includes(pattern)).forEach(
    ({ path, name }) => addImport(path, name),
  );

  addImport(`./${baseName}.impl`, isMultiExport ? "*" : baseName);

  // Render import lines (prettier will re-order)
  return importMap
    .entries()
    .map(([importPath, names]) =>
      names.size === 0
        ? `import "${importPath}";`
        : names.size === 1 && names.has("*")
          ? `import * as ${baseName} from "${importPath}";`
          : `import { ${[...names].join(", ")} } from "${importPath}";`,
    )
    .toArray();
}

// ─── Main ────────────────────────────────────────────────────────────────────

/**
 * Entry point. Walks every impl file, generates its global counterpart,
 * formats with prettier, and either writes the file (default) or compares it
 * against the existing file on disk (`--check` mode, used by CI).
 *
 * In check mode, exits `0` when every generated output matches what's already
 * on disk, or `1` otherwise.
 */
async function main(): Promise<void> {
  const implFiles = discoverImplFiles();
  const prettierConfig = await prettier.resolveConfig(path.join(SRC_DIR, "index.ts"));
  const prettierOpts = { ...prettierConfig, parser: "typescript" as const };
  let allMatch = true;
  let count = 0;

  // Create a ts-morph project for parsing
  const project = new Project({
    compilerOptions: {
      target: ScriptTarget.ESNext,
      moduleResolution: 2 /* Node */,
      strict: true,
      noImplicitAny: false,
      esModuleInterop: true,
      baseUrl: path.join(__dirname, ".."),
      paths: { "src/*": ["src/*"] },
    },
    skipFileDependencyResolution: true,
  });

  for (const impl of implFiles) {
    try {
      const sourceFile = project.addSourceFileAtPath(impl.implPath);
      const raw = generateGlobal(impl, sourceFile);
      const generated = await prettier.format(raw, prettierOpts);

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

      // Remove source file to free memory
      project.removeSourceFile(sourceFile);
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

void main();
