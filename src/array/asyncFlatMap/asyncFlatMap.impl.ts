import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Maps each element using an async callback, then flattens the results by one level.
 * Similar to `Promise.all(array.map(fn)).then(result => result.flat(1))`.
 * @param fn An async function that returns either a single value or an array of values
 * @returns A promise resolving to the flattened array of results
 * @example await [1, 2, 3].asyncFlatMap(async n => [n, n * 2]) //=> [1, 2, 2, 4, 3, 6]
 * @example await [].asyncFlatMap(async n => [n]) //=> []
 */
export async function asyncFlatMap<T, V>(arr: T[], fn: CallbackFn<T, Promise<V | V[]>>): Promise<V[]>;
/**
 * Maps each element using an async callback, then flattens the results by one level.
 * Similar to `Promise.all(array.map(fn)).then(result => result.flat(1))`.
 * @param fn An async function that returns either a single value or an array of values
 * @returns A promise resolving to the flattened array of results
 * @example await [1, 2, 3].asyncFlatMap(async n => [n, n * 2]) //=> [1, 2, 2, 4, 3, 6]
 * @example await [].asyncFlatMap(async n => [n]) //=> []
 */
export async function asyncFlatMap<T, V>(arr: readonly T[], fn: CallbackFnRO<T, Promise<V | V[]>>): Promise<V[]>;
export async function asyncFlatMap<T, V>(arr: readonly T[], fn: CallbackFnEither<T, Promise<V | V[]>>): Promise<V[]> {
  return Promise.all(arr.map(fn as CallbackFnRO<T, Promise<V | V[]>>)).then((result) => result.flat(1) as V[]);
}
