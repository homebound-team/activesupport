import { each } from "src/array/each/each.impl";
import { CallbackFn, CallbackFnRO } from "src/array/utils";

declare global {
  interface Array<T> {
    /**
     * Executes a function for each element and returns the original array for chaining.
     * Use this instead of `forEach` when you need to continue a method chain.
     * @param fn A function to execute for each element
     * @returns The original array
     * @example [1, 2, 3].each(n => console.log(n)).map(n => n * 2) //=> [2, 4, 6]
     * @example [].each(n => console.log(n)) //=> []
     */
    each(fn: CallbackFn<T>): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Executes a function for each element and returns the original array for chaining.
     * Use this instead of `forEach` when you need to continue a method chain.
     * @param fn A function to execute for each element
     * @returns The original array
     * @example [1, 2, 3].each(n => console.log(n)).map(n => n * 2) //=> [2, 4, 6]
     * @example [].each(n => console.log(n)) //=> []
     */
    each(fn: CallbackFnRO<T>): T[];
  }
}

Array.prototype.each = function <T>(this: T[], fn: CallbackFn<T>) {
  return each(this, fn);
};
