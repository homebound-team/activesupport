import { asyncMap } from "src/array/asyncMap/asyncMap.impl";
import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Filters the array using an async callback, waiting for all callbacks to resolve.
 * @param fn An async function to test each element
 * @returns A promise resolving to an array of elements that passed the callback
 * @example await [1, 2, 3, 4].asyncFilter(async n => n % 2 === 0) //=> [2, 4]
 * @example await [].asyncFilter(async n => true) //=> []
 */
export async function asyncFilter<T>(arr: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<T[]>;
/**
 * Filters the array using an async callback, waiting for all callbacks to resolve.
 * @param fn An async function to test each element
 * @returns A promise resolving to an array of elements that passed the callback
 * @example await [1, 2, 3, 4].asyncFilter(async n => n % 2 === 0) //=> [2, 4]
 * @example await [].asyncFilter(async n => true) //=> []
 */
export async function asyncFilter<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<boolean>>): Promise<T[]>;
export async function asyncFilter<T>(arr: readonly T[], fn: CallbackFnEither<T, Promise<boolean>>): Promise<T[]> {
  const results = await asyncMap(arr, fn as CallbackFnRO<T, Promise<boolean>>);
  return arr.filter((_v, index) => results[index]);
}
