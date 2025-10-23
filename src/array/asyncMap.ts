import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Maps each element using an async callback, waiting for all promises to resolve.
     * Equivalent to `Promise.all(array.map(fn))`.
     * @param fn An async function to transform each element
     * @returns A promise resolving to an array of transformed values
     * @example await [1, 2, 3].asyncMap(async n => n * 2) //=> [2, 4, 6]
     * @example await [].asyncMap(async n => n) //=> []
     */
    asyncMap<V>(fn: CallbackFn<T, Promise<V>>): Promise<V[]>;
  }

  interface ReadonlyArray<T> {
    /**
     * Maps each element using an async callback, waiting for all promises to resolve.
     * Equivalent to `Promise.all(array.map(fn))`.
     * @param fn An async function to transform each element
     * @returns A promise resolving to an array of transformed values
     * @example await [1, 2, 3].asyncMap(async n => n * 2) //=> [2, 4, 6]
     * @example await [].asyncMap(async n => n) //=> []
     */
    asyncMap<V>(fn: CallbackFnRO<T, Promise<V>>): Promise<V[]>;
  }
}

Array.prototype.asyncMap = async function <T, V>(this: T[], fn: CallbackFn<T, Promise<V>>): Promise<V[]> {
  return Promise.all(this.map(fn));
};
