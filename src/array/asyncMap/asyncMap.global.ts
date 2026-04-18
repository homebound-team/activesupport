import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { asyncMap } from "./asyncMap.impl";

declare global {
  interface Array<T> {
    /**
     * Maps each element of an array using an async callback, waiting for all promises to resolve.
     * Equivalent to `Promise.all(arr.map(fn))`.
     * @param fn An async function to transform each element
     * @returns A promise resolving to an array of transformed values
     * @example await [1, 2, 3].asyncMap(async n => n * 2) //=> [2, 4, 6]
     * @example await [].asyncMap(async n => n) //=> []
     */
    asyncMap<V>(fn: CallbackFn<T, Promise<V>>): Promise<V[]>;
  }

  interface ReadonlyArray<T> {
    /**
     * Maps each element of an array using an async callback, waiting for all promises to resolve.
     * Equivalent to `Promise.all(arr.map(fn))`.
     * @param fn An async function to transform each element
     * @returns A promise resolving to an array of transformed values
     * @example await [1, 2, 3].asyncMap(async n => n * 2) //=> [2, 4, 6]
     * @example await [].asyncMap(async n => n) //=> []
     */
    asyncMap<V>(fn: CallbackFnRO<T, Promise<V>>): Promise<V[]>;
  }
}

Array.prototype.asyncMap = function <T, V>(this: T[], fn: CallbackFn<T, Promise<V>>): Promise<V[]> {
  return asyncMap(this, fn);
};
