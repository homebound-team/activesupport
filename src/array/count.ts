import { MaybePromise, maybePromiseAllThen } from "../utils";
import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Counts the number of elements that satisfy the predicate.
     * @param fn A function to test each element
     * @returns The number of elements for which the predicate returns true
     * @example [1, 2, 3, 4, 5].count(n => n % 2 === 0) //=> 2
     * @example [].count(n => true) //=> 0
     */
    count(fn: CallbackFn<T, boolean>): number;
    /**
     * Counts the number of elements that satisfy the async predicate.
     * @param fn An async function to test each element
     * @returns A promise resolving to the number of elements for which the predicate returns true
     * @example await [1, 2, 3, 4, 5].count(async n => n % 2 === 0) //=> 2
     */
    count(fn: CallbackFn<T, Promise<boolean>>): Promise<number>;
  }

  interface ReadonlyArray<T> {
    /**
     * Counts the number of elements that satisfy the predicate.
     * @param fn A function to test each element
     * @returns The number of elements for which the predicate returns true
     * @example [1, 2, 3, 4, 5].count(n => n % 2 === 0) //=> 2
     * @example [].count(n => true) //=> 0
     */
    count(fn: CallbackFnRO<T, boolean>): number;
    /**
     * Counts the number of elements that satisfy the async predicate.
     * @param fn An async function to test each element
     * @returns A promise resolving to the number of elements for which the predicate returns true
     * @example await [1, 2, 3, 4, 5].count(async n => n % 2 === 0) //=> 2
     */
    count(fn: CallbackFnRO<T, Promise<boolean>>): Promise<number>;
  }
}

function count<T>(this: T[], fn: CallbackFn<T, boolean>): number;
function count<T>(this: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<number>;
function count<T>(this: T[], fn: CallbackFn<T, MaybePromise<boolean>>): MaybePromise<number> {
  const maybePromises = this.map(fn as any) as MaybePromise<boolean>[];
  return maybePromiseAllThen(maybePromises, (result) => result.filter((r) => r).length);
}

Array.prototype.count = count;
