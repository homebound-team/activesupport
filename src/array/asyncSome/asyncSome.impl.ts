import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Tests whether at least one element of an array passes an async callback.
 * Returns true as soon as any callback resolves to true, or false if all resolve to false.
 * @param arr The array to test
 * @param fn An async function to test each element
 * @returns A promise resolving to true if any element passes, false otherwise
 * @example await asyncSome([1, 2, 3], async n => n % 2 === 0) //=> true
 * @example await asyncSome([1, 3, 5], async n => n % 2 === 0) //=> false
 * @example await asyncSome([], async n => true) //=> false
 */
export async function asyncSome<T>(arr: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<boolean>;
/**
 * Tests whether at least one element of an array passes an async callback.
 * Returns true as soon as any callback resolves to true, or false if all resolve to false.
 * @param arr The array to test
 * @param fn An async function to test each element
 * @returns A promise resolving to true if any element passes, false otherwise
 * @example await asyncSome([1, 2, 3], async n => n % 2 === 0) //=> true
 * @example await asyncSome([1, 3, 5], async n => n % 2 === 0) //=> false
 * @example await asyncSome([], async n => true) //=> false
 */
export async function asyncSome<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<boolean>>): Promise<boolean>;
export async function asyncSome<T>(arr: readonly T[], fn: CallbackFnEither<T, Promise<boolean>>): Promise<boolean> {
  const asyncResults = arr.map((e, i, a) => fn(e, i, a as T[]).then((result) => result || Promise.reject()));
  return Promise.any(asyncResults).catch(() => false);
}
