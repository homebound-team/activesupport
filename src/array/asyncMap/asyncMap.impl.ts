import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Maps each element using an async callback, waiting for all promises to resolve.
 * Equivalent to `Promise.all(array.map(fn))`.
 * @param fn An async function to transform each element
 * @returns A promise resolving to an array of transformed values
 * @example await [1, 2, 3].asyncMap(async n => n * 2) //=> [2, 4, 6]
 * @example await [].asyncMap(async n => n) //=> []
 */
export async function asyncMap<T, V>(arr: T[], fn: CallbackFn<T, Promise<V>>): Promise<V[]>;
/**
 * Maps each element using an async callback, waiting for all promises to resolve.
 * Equivalent to `Promise.all(array.map(fn))`.
 * @param fn An async function to transform each element
 * @returns A promise resolving to an array of transformed values
 * @example await [1, 2, 3].asyncMap(async n => n * 2) //=> [2, 4, 6]
 * @example await [].asyncMap(async n => n) //=> []
 */
export async function asyncMap<T, V>(arr: readonly T[], fn: CallbackFnRO<T, Promise<V>>): Promise<V[]>;
export async function asyncMap<T, V>(arr: readonly T[], fn: CallbackFnEither<T, Promise<V>>): Promise<V[]> {
  return Promise.all(arr.map(fn as CallbackFnRO<T, Promise<V>>));
}
