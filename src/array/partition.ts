import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Splits `array` into two: one array with elements that satisfy `f`, and one with elements that do not.
     *
     * partition(["foo1", "bar", "foo2"], (s: string) => s.startsWith("foo"))
     * => [["foo1", "foo2"], ["bar"]]
     */
    partition(fn: CallbackFn<T, boolean>): [T[], T[]];
    partition<U>(fn: CallbackFn<T, boolean>, valueFn: CallbackFn<T, U>): [U[], U[]];
  }

  interface ReadonlyArray<T> {
    /**
     * Splits `array` into two: one array with elements that satisfy `f`, and one with elements that do not.
     *
     * partition(["foo1", "bar", "foo2"], (s: string) => s.startsWith("foo"))
     * => [["foo1", "foo2"], ["bar"]]
     */
    partition(fn: CallbackFnRO<T, boolean>): [T[], T[]];
    partition<U>(fn: CallbackFnRO<T, boolean>, valueFn: CallbackFnRO<T, U>): [U[], U[]];
  }
}

Array.prototype.partition = function <T, U = T>(
  this: T[],
  f: CallbackFn<T, boolean>,
  valueFn?: CallbackFn<T, U>,
): [U[], U[]] {
  const [trueElements, falseElements] = [[] as U[], [] as U[]];
  this.forEach((e, i, a) => (f(e, i, a) ? trueElements : falseElements).push(valueFn ? valueFn(e, i, a) : (e as any)));
  return [trueElements, falseElements];
};
