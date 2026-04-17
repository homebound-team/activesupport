import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { MaybePromise } from "src/utils";
import { count } from "./count.impl";

declare global {
  interface Array<T> {
    /**
     * Counts the number of elements in an array that satisfy the callback.
     * @param fn A function to test each element
     * @returns The number of elements for which the callback returns true
     * @example [1, 2, 3, 4, 5].count(n => n % 2 === 0) //=> 2
     * @example [].count(n => true) //=> 0
     */
    count(fn: CallbackFn<T, boolean>): number;
    /**
     * Counts the number of elements in an array that satisfy the async callback.
     * @param fn An async function to test each element
     * @returns A promise resolving to the number of elements for which the callback returns true
     * @example await [1, 2, 3, 4, 5].count(async n => n % 2 === 0) //=> 2
     */
    count(fn: CallbackFn<T, Promise<boolean>>): Promise<number>;
  }

  interface ReadonlyArray<T> {
    /**
     * Counts the number of elements in an array that satisfy the callback.
     * @param fn A function to test each element
     * @returns The number of elements for which the callback returns true
     * @example [1, 2, 3, 4, 5].count(n => n % 2 === 0) //=> 2
     * @example [].count(n => true) //=> 0
     */
    count(fn: CallbackFnRO<T, boolean>): number;
    /**
     * Counts the number of elements in an array that satisfy the async callback.
     * @param fn An async function to test each element
     * @returns A promise resolving to the number of elements for which the callback returns true
     * @example await [1, 2, 3, 4, 5].count(async n => n % 2 === 0) //=> 2
     */
    count(fn: CallbackFnRO<T, Promise<boolean>>): Promise<number>;
  }
}

Array.prototype.count = function <T>(this: T[], fn: CallbackFn<T, MaybePromise<boolean>>) {
  return count(this, fn as any);
} as any;
