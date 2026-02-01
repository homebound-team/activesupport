import { asyncForEach } from "src/array/asyncForEach/asyncForEach.impl";
import { CallbackFn, CallbackFnRO } from "src/array/utils";

declare global {
  interface Array<T> {
    /**
     * Executes an async callback for each element in the array, waiting for all to complete.
     * Similar to `Promise.all(array.map(fn))` but returns void instead of results.
     * @param fn An async function to execute for each element
     * @returns A promise that resolves when all callbacks complete
     * @example await ["a", "b", "c"].asyncForEach(async s => console.log(s))
     * @example await [].asyncForEach(async n => {}) //=> void
     */
    asyncForEach(fn: CallbackFn<T, Promise<any>>): Promise<void>;
  }

  interface ReadonlyArray<T> {
    /**
     * Executes an async callback for each element in the array, waiting for all to complete.
     * Similar to `Promise.all(array.map(fn))` but returns void instead of results.
     * @param fn An async function to execute for each element
     * @returns A promise that resolves when all callbacks complete
     * @example await ["a", "b", "c"].asyncForEach(async s => console.log(s))
     * @example await [].asyncForEach(async n => {}) //=> void
     */
    asyncForEach(fn: CallbackFnRO<T, Promise<any>>): Promise<void>;
  }
}

Array.prototype.asyncForEach = function <T>(this: T[], fn: CallbackFn<T, Promise<any>>) {
  return asyncForEach(this, fn);
};
