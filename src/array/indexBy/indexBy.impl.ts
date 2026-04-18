import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Creates a Map index from an array where each element can be associated with multiple keys.
 * Unlike `groupBy`, elements can appear under multiple keys (e.g., tags, categories).
 * @param arr - The array to index
 * @param fn - A function that returns an array of keys for each element
 * @param valueFn - Optional function to transform each element before indexing
 * @returns A Map where each key maps to an array of matching values
 * @example
 * indexBy([{id: 1, tags: ["red", "small"]}], item => item.tags)
 * //=> Map{"red" => [{id: 1, tags: ["red", "small"]}], "small" => [...]}
 * @example
 * indexBy([{id: 1, tags: ["a"]}], item => item.tags, item => item.id)
 * //=> Map{"a" => [1]}
 * @example
 * indexBy([], () => [])
 * //=> Map{}
 */
export function indexBy<T, O, Y = T>(arr: T[], fn: CallbackFn<T, O[]>, valueFn?: CallbackFn<T, Y>): Map<O, Y[]>;
/**
 * Creates a Map index from an array where each element can be associated with multiple keys.
 * Unlike `groupBy`, elements can appear under multiple keys (e.g., tags, categories).
 * @param arr - The array to index
 * @param fn - A function that returns an array of keys for each element
 * @param valueFn - Optional function to transform each element before indexing
 * @returns A Map where each key maps to an array of matching values
 * @example
 * indexBy([{id: 1, tags: ["red", "small"]}], item => item.tags)
 * //=> Map{"red" => [{id: 1, tags: ["red", "small"]}], "small" => [...]}
 * @example
 * indexBy([{id: 1, tags: ["a"]}], item => item.tags, item => item.id)
 * //=> Map{"a" => [1]}
 * @example
 * indexBy([], () => [])
 * //=> Map{}
 */
export function indexBy<T, O, Y = T>(
  arr: readonly T[],
  fn: CallbackFnRO<T, O[]>,
  valueFn?: CallbackFnRO<T, Y>,
): Map<O, Y[]>;
export function indexBy<T, O, Y = T>(
  arr: readonly T[],
  fn: CallbackFnEither<T, O[]>,
  valueFn?: CallbackFnEither<T, Y>,
): Map<O, Y[]> {
  const result = new Map<O, Y[]>();
  arr.forEach((e, i, a) => {
    const keys = new Set(fn(e, i, a as T[]));
    for (const key of keys) {
      let group = result.get(key);
      if (group === undefined) {
        group = [];
        result.set(key, group);
      }
      group.push(valueFn ? valueFn(e, i, a as T[]) : (e as any as Y));
    }
  });
  return result;
}
