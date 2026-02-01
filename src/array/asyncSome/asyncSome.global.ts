import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { asyncSome } from "./asyncSome.impl";

declare global {
  interface Array<T> {
    /**
     * Tests whether at least one element passes an async callback.
     * Returns true as soon as any callback resolves to true, or false if all resolve to false.
     * @param fn An async function to test each element
     * @returns A promise resolving to true if any element passes, false otherwise
     * @example await [1, 2, 3].asyncSome(async n => n % 2 === 0) //=> true
     * @example await [1, 3, 5].asyncSome(async n => n % 2 === 0) //=> false
     * @example await [].asyncSome(async n => true) //=> false
     */
    asyncSome(fn: CallbackFn<T, Promise<boolean>>): Promise<boolean>;
  }

  interface ReadonlyArray<T> {
    /**
     * Tests whether at least one element passes an async callback.
     * Returns true as soon as any callback resolves to true, or false if all resolve to false.
     * @param fn An async function to test each element
     * @returns A promise resolving to true if any element passes, false otherwise
     * @example await [1, 2, 3].asyncSome(async n => n % 2 === 0) //=> true
     * @example await [1, 3, 5].asyncSome(async n => n % 2 === 0) //=> false
     * @example await [].asyncSome(async n => true) //=> false
     */
    asyncSome(fn: CallbackFnRO<T, Promise<boolean>>): Promise<boolean>;
  }
}

Array.prototype.asyncSome = function <T>(this: T[], fn: CallbackFn<T, Promise<boolean>>) {
  return asyncSome(this, fn);
};
