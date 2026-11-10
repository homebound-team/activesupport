import { ArrayPromise } from "src/array/ArrayPromise";
import { asyncMap } from "src/array/asyncMap/asyncMap.impl";
import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Maps each element of an array using an async callback, then flattens the results by one level.
 * Similar to `Promise.all(arr.map(fn)).then(result => result.flat(1))`.
 * @param arr - The array to map and flatten
 * @param fn - An async function that returns either a single value or an array of values
 * @returns A promise resolving to the flattened array of results
 * @example
 * await asyncFlatMap([1, 2, 3], async n => [n, n * 2])
 * //=> [1, 2, 2, 4, 3, 6]
 * @example
 * await asyncFlatMap([], async n => [n])
 * //=> []
 */
export function asyncFlatMap<T, V>(arr: T[], fn: CallbackFn<T, Promise<V | V[]>>): ArrayPromise<V>;
/**
 * Maps each element of an array using an async callback, then flattens the results by one level.
 * Similar to `Promise.all(arr.map(fn)).then(result => result.flat(1))`.
 * @param arr - The array to map and flatten
 * @param fn - An async function that returns either a single value or an array of values
 * @returns A promise resolving to the flattened array of results
 * @example
 * await asyncFlatMap([1, 2, 3], async n => [n, n * 2])
 * //=> [1, 2, 2, 4, 3, 6]
 * @example
 * await asyncFlatMap([], async n => [n])
 * //=> []
 */
export function asyncFlatMap<T, V>(arr: readonly T[], fn: CallbackFnRO<T, Promise<V | V[]>>): ArrayPromise<V>;
export function asyncFlatMap<T, V>(arr: readonly T[], fn: CallbackFnEither<T, Promise<V | V[]>>): ArrayPromise<V> {
  return ArrayPromise.from(
    asyncMap(arr, fn as CallbackFnRO<T, Promise<V | V[]>>).then((result) => result.flat(1) as V[]),
  );
}
