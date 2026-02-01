import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { MaybePromise } from "src/utils";
import { asyncPartition } from "./asyncPartition.impl";

declare global {
  interface Array<T> {
    /**
     * Splits the array into two using an async callback: elements that satisfy it and elements that don't.
     * @param fn An async function to test each element
     * @returns A promise resolving to a tuple of [matches, non-matches]
     * @example await ["foo1", "bar", "foo2"].asyncPartition(async s => s.startsWith("foo")) //=> [["foo1", "foo2"], ["bar"]]
     * @example await [].asyncPartition(async () => true) //=> [[], []]
     */
    asyncPartition(fn: CallbackFn<T, Promise<boolean>>): Promise<[T[], T[]]>;
    /**
     * Splits the array into two using an async callback, transforming elements with valueFn.
     * @param fn An async function to test each element
     * @param valueFn A function to transform each element before adding to result
     * @returns A promise resolving to a tuple of [transformed matches, transformed non-matches]
     */
    asyncPartition<U>(
      fn: CallbackFn<T, Promise<boolean>>,
      valueFn: CallbackFn<T, MaybePromise<U>>,
    ): Promise<[U[], U[]]>;
  }

  interface ReadonlyArray<T> {
    /**
     * Splits the array into two using an async callback: elements that satisfy it and elements that don't.
     * @param fn An async function to test each element
     * @returns A promise resolving to a tuple of [matches, non-matches]
     * @example await ["foo1", "bar", "foo2"].asyncPartition(async s => s.startsWith("foo")) //=> [["foo1", "foo2"], ["bar"]]
     * @example await [].asyncPartition(async () => true) //=> [[], []]
     */
    asyncPartition(fn: CallbackFnRO<T, Promise<boolean>>): Promise<[T[], T[]]>;
    /**
     * Splits the array into two using an async callback, transforming elements with valueFn.
     * @param fn An async function to test each element
     * @param valueFn A function to transform each element before adding to result
     * @returns A promise resolving to a tuple of [transformed matches, transformed non-matches]
     */
    asyncPartition<U>(
      fn: CallbackFnRO<T, Promise<boolean>>,
      valueFn: CallbackFnRO<T, MaybePromise<U>>,
    ): Promise<[U[], U[]]>;
  }
}

Array.prototype.asyncPartition = function <T, U = T>(
  this: T[],
  fn: CallbackFn<T, Promise<boolean>>,
  valueFn?: CallbackFn<T, MaybePromise<U>>,
) {
  return asyncPartition(this, fn, valueFn!);
};
