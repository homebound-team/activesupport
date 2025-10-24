import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Filters the array using an async predicate, waiting for all predicates to resolve.
     * @param predicate An async function to test each element
     * @returns A promise resolving to an array of elements that passed the predicate
     * @example await [1, 2, 3, 4].asyncFilter(async n => n % 2 === 0) //=> [2, 4]
     * @example await [].asyncFilter(async n => true) //=> []
     */
    asyncFilter(predicate: CallbackFn<T, Promise<boolean>>): Promise<T[]>;
  }

  interface ReadonlyArray<T> {
    /**
     * Filters the array using an async predicate, waiting for all predicates to resolve.
     * @param predicate An async function to test each element
     * @returns A promise resolving to an array of elements that passed the predicate
     * @example await [1, 2, 3, 4].asyncFilter(async n => n % 2 === 0) //=> [2, 4]
     * @example await [].asyncFilter(async n => true) //=> []
     */
    asyncFilter(predicate: CallbackFnRO<T, Promise<boolean>>): Promise<T[]>;
  }
}

Array.prototype.asyncFilter = async function <T>(this: T[], predicate: CallbackFn<T, Promise<boolean>>): Promise<T[]> {
  const results = await this.asyncMap(predicate);
  return this.filter((_v, index) => results[index]);
};
