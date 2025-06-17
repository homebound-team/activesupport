import { MaybePromise } from "../utils";
import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Splits `array` into two: one array with elements that satisfy `f`, and one with elements that do not.
     *
     * partition(["foo1", "bar", "foo2"], (s: string) => s.startsWith("foo"))
     * => [["foo1", "foo2"], ["bar"]]
     */
    asyncPartition(fn: CallbackFn<T, Promise<boolean>>): Promise<[T[], T[]]>;
    asyncPartition<U>(
      fn: CallbackFn<T, Promise<boolean>>,
      valueFn: CallbackFn<T, MaybePromise<U>>,
    ): Promise<[U[], U[]]>;
  }

  interface ReadonlyArray<T> {
    /**
     * Splits `array` into two: one array with elements that satisfy `f`, and one with elements that do not.
     *
     * partition(["foo1", "bar", "foo2"], (s: string) => s.startsWith("foo"))
     * => [["foo1", "foo2"], ["bar"]]
     */
    asyncPartition(fn: CallbackFnRO<T, Promise<boolean>>): Promise<[T[], T[]]>;
    asyncPartition<U>(
      fn: CallbackFnRO<T, Promise<boolean>>,
      valueFn: CallbackFnRO<T, MaybePromise<U>>,
    ): Promise<[U[], U[]]>;
  }
}

Array.prototype.asyncPartition = async function <T, U = T>(
  this: T[],
  f: CallbackFn<T, Promise<boolean>>,
  valueFn?: CallbackFn<T, MaybePromise<U>>,
): Promise<[U[], U[]]> {
  return this.asyncMap((e, i, a) => Promise.all([f(e, i, a), valueFn ? valueFn(e, i, a) : (e as any)])).then((result) =>
    result.partition(
      ([result]) => result,
      ([, result]) => result,
    ),
  );
};
