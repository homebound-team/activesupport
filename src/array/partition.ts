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
  }

  interface ReadonlyArray<T> {
    /**
     * Splits `array` into two: one array with elements that satisfy `f`, and one with elements that do not.
     *
     * partition(["foo1", "bar", "foo2"], (s: string) => s.startsWith("foo"))
     * => [["foo1", "foo2"], ["bar"]]
     */
    partition(fn: CallbackFnRO<T, boolean>): [T[], T[]];
  }
}

Array.prototype.partition = function <T>(this: T[], f: CallbackFn<T, boolean>): [T[], T[]] {
  const [trueElements, falseElements] = [[] as T[], [] as T[]];
  this.forEach((e, i, a) => (f(e, i, a) ? trueElements : falseElements).push(e));
  return [trueElements, falseElements];
};
