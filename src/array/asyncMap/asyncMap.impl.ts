import { ArrayPromise } from "src/array/ArrayPromise";
import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Maps each element of an array using an async callback, waiting for all promises to resolve.
 * Equivalent to `Promise.all(arr.map(fn))`.
 * @param arr - The array to map
 * @param fn - An async function to transform each element
 * @returns A promise resolving to an array of transformed values
 * @example
 * await asyncMap([1, 2, 3], async n => n * 2)
 * //=> [2, 4, 6]
 * @example
 * await asyncMap([], async n => n)
 * //=> []
 */
export function asyncMap<T, V>(arr: T[], fn: CallbackFn<T, Promise<V>>): ArrayPromise<V>;
/**
 * Maps each element of an array using an async callback, waiting for all promises to resolve.
 * Equivalent to `Promise.all(arr.map(fn))`.
 * @param arr - The array to map
 * @param fn - An async function to transform each element
 * @returns A promise resolving to an array of transformed values
 * @example
 * await asyncMap([1, 2, 3], async n => n * 2)
 * //=> [2, 4, 6]
 * @example
 * await asyncMap([], async n => n)
 * //=> []
 */
export function asyncMap<T, V>(arr: readonly T[], fn: CallbackFnRO<T, Promise<V>>): ArrayPromise<V>;
export function asyncMap<T, V>(arr: readonly T[], fn: CallbackFnEither<T, Promise<V>>): ArrayPromise<V> {
  // Use the executor so a callback that throws synchronously still produces a rejected promise
  return new ArrayPromise((resolve) => resolve(Promise.all(arr.map(fn as CallbackFnRO<T, Promise<V>>))));
}
