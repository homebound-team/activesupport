import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Maps each element using an async callback, then flattens the results by one level.
     * Similar to `Promise.all(array.map(fn)).then(result => result.flat(1))`.
     * @param fn An async function that returns either a single value or an array of values
     * @returns A promise resolving to the flattened array of results
     * @example await [1, 2, 3].asyncFlatMap(async n => [n, n * 2]) //=> [1, 2, 2, 4, 3, 6]
     * @example await [].asyncFlatMap(async n => [n]) //=> []
     */
    asyncFlatMap<V>(fn: CallbackFn<T, Promise<V | V[]>>): Promise<V[]>;
  }

  interface ReadonlyArray<T> {
    /**
     * Maps each element using an async callback, then flattens the results by one level.
     * Similar to `Promise.all(array.map(fn)).then(result => result.flat(1))`.
     * @param fn An async function that returns either a single value or an array of values
     * @returns A promise resolving to the flattened array of results
     * @example await [1, 2, 3].asyncFlatMap(async n => [n, n * 2]) //=> [1, 2, 2, 4, 3, 6]
     * @example await [].asyncFlatMap(async n => [n]) //=> []
     */
    asyncFlatMap<V>(fn: CallbackFnRO<T, Promise<V | V[]>>): Promise<V[]>;
  }
}

Array.prototype.asyncFlatMap = async function <T, V>(this: T[], fn: CallbackFn<T, Promise<V | V[]>>): Promise<V[]> {
  return Promise.all(this.map(fn)).then((result) => result.flat(1) as V[]);
};
