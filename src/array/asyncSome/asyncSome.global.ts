import { asyncSomeImpl } from "src/array/asyncSome/asyncSome.impl";
import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { MaybePromise } from "src/utils";

declare global {
  interface Array<T> {
    /**
     * Tests whether at least one element passes an async predicate.
     * Returns true as soon as any predicate resolves to true, or false if all resolve to false.
     * @param predicate An async function to test each element
     * @returns A promise resolving to true if any element passes, false otherwise
     * @example await [1, 2, 3].asyncSome(async n => n % 2 === 0) //=> true
     * @example await [1, 3, 5].asyncSome(async n => n % 2 === 0) //=> false
     * @example await [].asyncSome(async n => true) //=> false
     */
    asyncSome(predicate: CallbackFn<T, MaybePromise<boolean>>): Promise<boolean>;
  }

  interface ReadonlyArray<T> {
    /**
     * Tests whether at least one element passes an async predicate.
     * Returns true as soon as any predicate resolves to true, or false if all resolve to false.
     * @param predicate An async function to test each element
     * @returns A promise resolving to true if any element passes, false otherwise
     * @example await [1, 2, 3].asyncSome(async n => n % 2 === 0) //=> true
     * @example await [1, 3, 5].asyncSome(async n => n % 2 === 0) //=> false
     * @example await [].asyncSome(async n => true) //=> false
     */
    asyncSome(predicate: CallbackFnRO<T, MaybePromise<boolean>>): Promise<boolean>;
  }
}

Array.prototype.asyncSome = asyncSomeImpl;
