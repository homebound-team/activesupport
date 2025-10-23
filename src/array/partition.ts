import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Splits the array into two: elements that satisfy the predicate and elements that don't.
     * @param fn A function to test each element
     * @returns A tuple of [matches, non-matches]
     * @example ["foo1", "bar", "foo2"].partition(s => s.startsWith("foo")) //=> [["foo1", "foo2"], ["bar"]]
     * @example [].partition(() => true) //=> [[], []]
     */
    partition(fn: CallbackFn<T, boolean>): [T[], T[]];
    /**
     * Splits the array into two after transforming elements with valueFn.
     * @param fn A function to test each element
     * @param valueFn A function to transform each element before adding to result
     * @returns A tuple of [transformed matches, transformed non-matches]
     * @example [{name: "foo1"}, {name: "bar"}].partition(o => o.name.startsWith("foo"), o => o.name) //=> [["foo1"], ["bar"]]
     */
    partition<U>(fn: CallbackFn<T, boolean>, valueFn: CallbackFn<T, U>): [U[], U[]];
  }

  interface ReadonlyArray<T> {
    /**
     * Splits the array into two: elements that satisfy the predicate and elements that don't.
     * @param fn A function to test each element
     * @returns A tuple of [matches, non-matches]
     * @example ["foo1", "bar", "foo2"].partition(s => s.startsWith("foo")) //=> [["foo1", "foo2"], ["bar"]]
     * @example [].partition(() => true) //=> [[], []]
     */
    partition(fn: CallbackFnRO<T, boolean>): [T[], T[]];
    /**
     * Splits the array into two after transforming elements with valueFn.
     * @param fn A function to test each element
     * @param valueFn A function to transform each element before adding to result
     * @returns A tuple of [transformed matches, transformed non-matches]
     * @example [{name: "foo1"}, {name: "bar"}].partition(o => o.name.startsWith("foo"), o => o.name) //=> [["foo1"], ["bar"]]
     */
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
