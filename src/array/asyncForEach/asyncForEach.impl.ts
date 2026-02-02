import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Executes an async callback for each element in an array, waiting for all to complete.
 * Similar to `Promise.all(arr.map(fn))` but returns void instead of results.
 * @param arr The array to iterate over
 * @param fn An async function to execute for each element
 * @returns A promise that resolves when all callbacks complete
 * @example await asyncForEach(["a", "b", "c"], async s => console.log(s))
 * @example await asyncForEach([], async n => {}) //=> void
 */
export async function asyncForEach<T>(arr: T[], fn: CallbackFn<T, Promise<any>>): Promise<void>;
/**
 * Executes an async callback for each element in an array, waiting for all to complete.
 * Similar to `Promise.all(arr.map(fn))` but returns void instead of results.
 * @param arr The array to iterate over
 * @param fn An async function to execute for each element
 * @returns A promise that resolves when all callbacks complete
 * @example await asyncForEach(["a", "b", "c"], async s => console.log(s))
 * @example await asyncForEach([], async n => {}) //=> void
 */
export async function asyncForEach<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<any>>): Promise<void>;
export async function asyncForEach<T>(arr: readonly T[], fn: CallbackFnEither<T, Promise<any>>): Promise<void> {
  await Promise.all(arr.map(fn as CallbackFnRO<T, Promise<any>>));
}
