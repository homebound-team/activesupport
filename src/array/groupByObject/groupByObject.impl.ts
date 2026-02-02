import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Groups array elements by any object key (not limited to property keys like strings/numbers).
 * Returns an array of [key, values] tuples. Use this when grouping by objects or complex keys.
 * @param fn A function that returns the grouping key (can be any object) for each element
 * @param valueFn Optional function to transform each element before grouping
 * @returns An array of [key, values[]] tuples
 * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupByObject(p => ({decade: Math.floor(p.age / 10)})) //=> [[{decade: 2}, [{name: "Alice", age: 25}, {name: "Bob", age: 25}]]]
 */
export function groupByObject<T, O, Y = T>(arr: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>): [O, Y[]][];
/**
 * Groups array elements by any object key (not limited to property keys like strings/numbers).
 * Returns an array of [key, values] tuples. Use this when grouping by objects or complex keys.
 * @param fn A function that returns the grouping key (can be any object) for each element
 * @param valueFn Optional function to transform each element before grouping
 * @returns An array of [key, values[]] tuples
 * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupByObject(p => ({decade: Math.floor(p.age / 10)})) //=> [[{decade: 2}, [{name: "Alice", age: 25}, {name: "Bob", age: 25}]]]
 */
export function groupByObject<T, O, Y = T>(
  arr: readonly T[],
  fn: CallbackFnRO<T, O>,
  valueFn?: CallbackFnRO<T, Y>,
): [O, Y[]][];
export function groupByObject<T, O, Y = T>(
  arr: readonly T[],
  fn: CallbackFnEither<T, O>,
  valueFn?: CallbackFnEither<T, Y>,
): [O, Y[]][] {
  const result = new Map<O, Y[]>();
  arr.forEach((e, i, a) => {
    const key = fn(e, i, a as T[]);
    let group = result.get(key);
    if (group === undefined) {
      group = [];
      result.set(key, group);
    }
    group.push(valueFn ? valueFn(e, i, a as T[]) : (e as any as Y));
  });
  return [...result.entries()];
}
