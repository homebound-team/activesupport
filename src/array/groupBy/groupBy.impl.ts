import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Groups elements of an array into a record by a key extracted from each element.
 * Optionally transforms values using a value function.
 * @param arr - The array to group
 * @param fn - A function that returns the grouping key for each element
 * @param valueFn - Optional function to transform each element before grouping
 * @returns A record mapping keys to arrays of grouped values
 * @example
 * groupBy([{name: "Alice", age: 25}, {name: "Bob", age: 25}], p => p.age)
 * //=> {25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}]}
 * @example
 * groupBy([{name: "Alice", age: 25}, {name: "Bob", age: 30}], p => p.age, p => p.name)
 * //=> {25: ["Alice"], 30: ["Bob"]}
 * @example
 * groupBy([], p => p.key)
 * //=> {}
 */
export function groupBy<T, K extends PropertyKey>(arr: T[], fn: CallbackFn<T, K>): Record<K, T[]>;
/**
 * Groups elements of an array into a record by a key extracted from each element.
 * Optionally transforms values using a value function.
 * @param arr - The array to group
 * @param fn - A function that returns the grouping key for each element
 * @param valueFn - Optional function to transform each element before grouping
 * @returns A record mapping keys to arrays of grouped values
 * @example
 * groupBy([{name: "Alice", age: 25}, {name: "Bob", age: 25}], p => p.age)
 * //=> {25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}]}
 * @example
 * groupBy([{name: "Alice", age: 25}, {name: "Bob", age: 30}], p => p.age, p => p.name)
 * //=> {25: ["Alice"], 30: ["Bob"]}
 * @example
 * groupBy([], p => p.key)
 * //=> {}
 */
export function groupBy<K extends PropertyKey, T, R>(
  arr: T[],
  fn: CallbackFn<T, K>,
  valueFn: CallbackFn<T, R>,
): Record<K, R[]>;
/**
 * Groups elements of an array into a record by a key extracted from each element.
 * Optionally transforms values using a value function.
 * @param arr - The array to group
 * @param fn - A function that returns the grouping key for each element
 * @param valueFn - Optional function to transform each element before grouping
 * @returns A record mapping keys to arrays of grouped values
 * @example
 * groupBy([{name: "Alice", age: 25}, {name: "Bob", age: 25}], p => p.age)
 * //=> {25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}]}
 * @example
 * groupBy([{name: "Alice", age: 25}, {name: "Bob", age: 30}], p => p.age, p => p.name)
 * //=> {25: ["Alice"], 30: ["Bob"]}
 * @example
 * groupBy([], p => p.key)
 * //=> {}
 */
export function groupBy<T, K extends PropertyKey>(arr: readonly T[], fn: CallbackFnRO<T, K>): Record<K, T[]>;
/**
 * Groups elements of an array into a record by a key extracted from each element.
 * Optionally transforms values using a value function.
 * @param arr - The array to group
 * @param fn - A function that returns the grouping key for each element
 * @param valueFn - Optional function to transform each element before grouping
 * @returns A record mapping keys to arrays of grouped values
 * @example
 * groupBy([{name: "Alice", age: 25}, {name: "Bob", age: 25}], p => p.age)
 * //=> {25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}]}
 * @example
 * groupBy([{name: "Alice", age: 25}, {name: "Bob", age: 30}], p => p.age, p => p.name)
 * //=> {25: ["Alice"], 30: ["Bob"]}
 * @example
 * groupBy([], p => p.key)
 * //=> {}
 */
export function groupBy<K extends PropertyKey, T, R>(
  arr: readonly T[],
  fn: CallbackFnRO<T, K>,
  valueFn: CallbackFnRO<T, R>,
): Record<K, R[]>;
export function groupBy<K extends PropertyKey, T, Y = T>(
  arr: readonly T[],
  fn: CallbackFnEither<T, K>,
  valueFn?: CallbackFnEither<T, Y>,
): Record<K, Y[]> {
  const result = {} as Record<K, Y[]>;
  arr.forEach((e, i, a) => {
    const group = fn(e, i, a as T[]);
    result[group] ??= [];
    result[group].push(valueFn ? valueFn(e, i, a as T[]) : (e as any as Y));
  });
  return result;
}
