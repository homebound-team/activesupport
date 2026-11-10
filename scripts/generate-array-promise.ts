/**
 * Generates the helper methods of `src/array/ArrayPromise.ts` from the array `.impl.ts` files.
 *
 * `ArrayPromise.ts` is hand-written except for the section between the BEGIN/END GENERATED HELPERS markers, which
 * this module regenerates. It's driven by `generate-globals.ts` (so `yarn generate:globals [--check]` covers it),
 * which parses the impls and hands over each helper's `Array<T>` overloads with their JSDoc already in method form.
 *
 * For each helper, the rules are:
 * - Array results (`X[]`, `readonly X[]`, `Array<X>`, `ArrayPromise<X>`, or a `Promise` of one) continue the chain
 *   as `ArrayPromise<X>`; anything else ends it as a plain `Promise`
 * - A concrete element type becomes a `this:` constraint (`sum()` → `this: ArrayPromise<number | undefined>`), and a
 *   constrained `T extends X` becomes `this: ArrayPromise<T & X>`
 * - Property helpers (`first`, `last`, ...) become getters
 * - Helpers that mutate their receiver are skipped
 *
 * Note that this module and `generate-globals.ts` import each other. That's safe because `generate-globals.ts` is
 * always the entry point and the values imported from it (`IMPORT_PATTERNS`) are only read when `main()` calls
 * `generateArrayPromise`. Don't run or import this module on its own: importing `generate-globals.ts` runs `main()`.
 */
import * as fs from "fs";
import * as path from "path";
import { Node, Project, SyntaxKind, TypeNode } from "ts-morph";
import { IMPORT_PATTERNS, ParsedOverload } from "./generate-globals";

export const ARRAY_PROMISE_PATH = path.join(__dirname, "..", "src", "array", "ArrayPromise.ts");
const BEGIN_MARKER = "// BEGIN GENERATED HELPERS";
const END_MARKER = "// END GENERATED HELPERS";

/**
 * Helpers that mutate their receiver. They make no sense on an `ArrayPromise`, whose resolved array nobody else
 * holds a reference to, so they're left off.
 */
const EXCLUDED = new Set(["remove", "removeAll", "findAndRemove"]);

/** An array helper to generate `ArrayPromise` members for. */
export interface ArrayPromiseHelper {
  name: string;
  /** True for helpers exposed as getters (`first`, `isEmpty`, ...) rather than methods. */
  isProperty: boolean;
  /** The helper's `Array<T>` overloads, with `jsdoc` already rewritten to method form. */
  overloads: ParsedOverload[];
}

/** In-memory project for parsing type snippets. */
const typeProject = new Project({ useInMemoryFileSystem: true });

/** Parses a type's source text into a ts-morph `TypeNode`. The node is only valid until the next call. */
function parseTypeNode(typeText: string): TypeNode {
  const sf = typeProject.createSourceFile("__type.ts", `type __T = ${typeText};`, { overwrite: true });
  return sf.getTypeAliasOrThrow("__T").getTypeNodeOrThrow();
}

/**
 * Returns the element type text of an array-like type node, or `undefined` if it isn't one.
 *
 * @example
 * arrayElementType(parseTypeNode("readonly (number | undefined)[]")); //=> "number | undefined"
 * arrayElementType(parseTypeNode("Array<T>"));                        //=> "T"
 * arrayElementType(parseTypeNode("[T[], T[]]"));                      //=> undefined (tuples aren't chained)
 */
function arrayElementType(node: TypeNode): string | undefined {
  if (Node.isParenthesizedTypeNode(node)) return arrayElementType(node.getTypeNode());
  if (Node.isTypeOperatorTypeNode(node) && node.getOperator() === SyntaxKind.ReadonlyKeyword) {
    return arrayElementType(node.getTypeNode());
  }
  if (Node.isArrayTypeNode(node)) {
    let element = node.getElementTypeNode();
    while (Node.isParenthesizedTypeNode(element)) element = element.getTypeNode();
    return element.getText();
  }
  if (Node.isTypeReference(node) && ["Array", "ReadonlyArray", "ArrayPromise"].includes(node.getTypeName().getText())) {
    return node.getTypeArguments()[0]?.getText();
  }
  return undefined;
}

/**
 * Maps a helper's return type to the `ArrayPromise` method's return type. Arrays (including promises of arrays)
 * continue the chain as `ArrayPromise`s; everything else ends it as a plain, flattened `Promise`.
 *
 * @example
 * toArrayPromiseReturn("NonNullable<T>[]");        //=> { chains: true, type: "ArrayPromise<NonNullable<T>>" }
 * toArrayPromiseReturn("ArrayPromise<V>");         //=> { chains: true, type: "ArrayPromise<V>" }
 * toArrayPromiseReturn("Promise<number>");         //=> { chains: false, type: "Promise<number>" }
 * toArrayPromiseReturn("Record<K, T[]>");          //=> { chains: false, type: "Promise<Record<K, T[]>>" }
 */
function toArrayPromiseReturn(returnType: string): { chains: boolean; type: string } {
  const node = parseTypeNode(returnType);
  const element = arrayElementType(node);
  if (element !== undefined) return { chains: true, type: `ArrayPromise<${element}>` };
  if (Node.isTypeReference(node) && node.getTypeName().getText() === "Promise") {
    return toArrayPromiseReturn(node.getTypeArguments()[0].getText());
  }
  return { chains: false, type: `Promise<${returnType}>` };
}

/**
 * Returns the `this:` type an `ArrayPromise` method overload needs, or `undefined` when the overload works for any
 * `ArrayPromise<T>`.
 *
 * @example
 * // sum(arr: readonly (number | undefined)[])
 * thisTypeFor(sumOverload, "sum");         //=> "ArrayPromise<number | undefined>"
 * // max<T extends Comparable>(arr: readonly T[])
 * thisTypeFor(maxOverload, "max");         //=> "ArrayPromise<T & Comparable>"
 * // compact<T>(arr: readonly T[])
 * thisTypeFor(compactOverload, "compact"); //=> undefined
 */
function thisTypeFor(overload: ParsedOverload, funcName: string): string | undefined {
  const selfType = overload.params[0]?.typeText;
  const element = selfType ? arrayElementType(parseTypeNode(selfType)) : undefined;
  if (element === undefined) throw new Error(`${funcName}: first parameter is not an array (${selfType})`);
  if (element !== "T") return `ArrayPromise<${element}>`;
  const constraint = overload.typeParams
    .find((tp) => tp.split(/\s+/)[0] === "T")
    ?.match(/^T\s+extends\s+(.+?)(?:\s*=.*)?$/)?.[1];
  return constraint ? `ArrayPromise<T & ${constraint}>` : undefined;
}

/** Drops `@example`s: they show plain arrays and sync results, which would mislead on an ArrayPromise. */
function withoutExamples(jsdoc: string[]): string[] {
  return jsdoc.filter((line) => !line.startsWith(" * @example"));
}

/**
 * Builds the `ArrayPromise` class members for one helper: a JSDoc'd signature per overload, plus a single
 * implementation that forwards to the impl function via `#chain` (array results) or `#end` (anything else).
 *
 * @example
 * // compact<T>(arr: readonly T[]): NonNullable<T>[]
 * //   /** Returns a new array with all `null` and `undefined` elements removed. ... *\/
 * //   compact(): ArrayPromise<NonNullable<T>>;
 * //   compact(...args: any[]): any {
 * //     return this.#chain((a) => (compact as any)(a, ...args));
 * //   }
 * @example
 * // first<T>(arr: readonly T[]): T | undefined   (a property)
 * //   get first(): Promise<T | undefined> {
 * //     return this.#end((a) => first(a));
 * //   }
 */
function generateMembers(helper: ArrayPromiseHelper): string[] {
  const { name, overloads } = helper;
  const lines: string[] = [];

  if (helper.isProperty) {
    const [overload] = overloads;
    const { type } = toArrayPromiseReturn(overload.returnType);
    lines.push(...withoutExamples(overload.jsdoc));
    lines.push(`get ${name}(): ${type} {`, `  return this.#end((a) => ${name}(a));`, "}");
    return lines;
  }

  const results = overloads.map((overload) => {
    const methodTypeParams = overload.typeParams.filter((tp) => tp.split(/\s+/)[0] !== "T");
    const generics = methodTypeParams.length > 0 ? `<${methodTypeParams.join(", ")}>` : "";
    const thisType = thisTypeFor(overload, name);
    const params = overload.params
      .slice(1)
      .map((p) =>
        (p.hasInitializer ? `${p.name}?: ${p.typeText}` : p.fullText).replace(/CallbackFnEither/g, "CallbackFn"),
      );
    if (thisType) params.unshift(`this: ${thisType}`);
    const ret = toArrayPromiseReturn(overload.returnType);
    lines.push(...withoutExamples(overload.jsdoc));
    lines.push(`${name}${generics}(${params.join(", ")}): ${ret.type};`);
    return ret;
  });

  const chains = results[0].chains;
  if (results.some((r) => r.chains !== chains)) {
    throw new Error(`${name}: overloads mix array and non-array return types, so it can't be an ArrayPromise method`);
  }
  lines.push(
    `${name}(...args: any[]): any {`,
    `  return this.${chains ? "#chain" : "#end"}((a) => (${name} as any)(a, ...args));`,
    "}",
  );
  return lines;
}

/** Returns import lines for the shared types (`CallbackFn`, `Comparable`, ...) that `code` refers to. */
function typeImportsFor(code: string): string[] {
  return IMPORT_PATTERNS.filter(
    ({ name, path }) => name && path !== "src/array/ArrayPromise" && code.includes(name),
  ).map(({ name, path }) => `import { ${name} } from "${path}";`);
}

/**
 * Returns the new (unformatted) contents of `src/array/ArrayPromise.ts`: the existing file with the section between
 * the markers regenerated, plus imports for the helpers and for the shared types the generated code uses (resolved
 * by `typeImportsFor`). Prettier's organize-imports plugin then merges duplicates and drops imports that are no
 * longer used, so the hand-written imports above the class can stay as they are.
 */
export function generateArrayPromise(helpers: ArrayPromiseHelper[]): string {
  const existing = fs.readFileSync(ARRAY_PROMISE_PATH, "utf-8");
  const begin = existing.indexOf(BEGIN_MARKER);
  const end = existing.indexOf(END_MARKER);
  if (begin === -1 || end === -1 || end < begin) {
    throw new Error(`${ARRAY_PROMISE_PATH} must contain "${BEGIN_MARKER}" followed by "${END_MARKER}"`);
  }

  const included = helpers.filter((h) => !EXCLUDED.has(h.name)).sort((a, b) => a.name.localeCompare(b.name));
  const membersText = included
    .flatMap((h) => [...generateMembers(h), ""])
    .map((l) => (l === "" ? "" : `  ${l}`))
    .join("\n");

  return [
    ...included.map((h) => `import { ${h.name} } from "src/array/${h.name}/${h.name}.impl";`),
    ...typeImportsFor(membersText),
    existing.slice(0, begin + BEGIN_MARKER.length),
    membersText,
    `  ${existing.slice(end)}`,
  ].join("\n");
}
