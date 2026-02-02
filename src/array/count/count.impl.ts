import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { MaybePromise, maybePromiseAllThen } from "src/utils";

/**
 * Counts the number of elements that satisfy the callback.
 * @param fn A function to test each element
 * @returns The number of elements for which the callback returns true
 * @example [1, 2, 3, 4, 5].count(n => n % 2 === 0) //=> 2
 * @example [].count(n => true) //=> 0
 */
export function count<T>(arr: T[], fn: CallbackFn<T, boolean>): number;
/**
 * Counts the number of elements that satisfy the async callback.
 * @param fn An async function to test each element
 * @returns A promise resolving to the number of elements for which the callback returns true
 * @example await [1, 2, 3, 4, 5].count(async n => n % 2 === 0) //=> 2
 */
export function count<T>(arr: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<number>;
/**
 * Counts the number of elements that satisfy the callback.
 * @param fn A function to test each element
 * @returns The number of elements for which the callback returns true
 * @example [1, 2, 3, 4, 5].count(n => n % 2 === 0) //=> 2
 * @example [].count(n => true) //=> 0
 */
export function count<T>(arr: readonly T[], fn: CallbackFnRO<T, boolean>): number;
/**
 * Counts the number of elements that satisfy the async callback.
 * @param fn An async function to test each element
 * @returns A promise resolving to the number of elements for which the callback returns true
 * @example await [1, 2, 3, 4, 5].count(async n => n % 2 === 0) //=> 2
 */
export function count<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<boolean>>): Promise<number>;
export function count<T>(arr: readonly T[], fn: CallbackFnEither<T, MaybePromise<boolean>>): MaybePromise<number> {
  const maybePromises = arr.map(fn as any) as MaybePromise<boolean>[];
  return maybePromiseAllThen(maybePromises, (result) => result.filter((r) => r).length);
}
