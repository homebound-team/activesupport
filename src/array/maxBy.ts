import { Comparable, compare } from "../utils";
import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Returns the element with the maximum value as determined by the callback function.
     * @param fn A function that returns a comparable value for each element
     * @returns The element with the largest value
     * @example [{foo: 1}, {foo: 2}, {foo: 3}].maxBy(v => v.foo) //=> {foo: 3}
     * @example ["a", "abc", "ab"].maxBy(s => s.length) //=> "abc"
     * @example [].maxBy(x => x) //=> undefined
     */
    maxBy<R extends Comparable>(fn: CallbackFn<T, R>): T;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the element with the maximum value as determined by the callback function.
     * @param fn A function that returns a comparable value for each element
     * @returns The element with the largest value
     * @example [{foo: 1}, {foo: 2}, {foo: 3}].maxBy(v => v.foo) //=> {foo: 3}
     * @example ["a", "abc", "ab"].maxBy(s => s.length) //=> "abc"
     * @example [].maxBy(x => x) //=> undefined
     */
    maxBy<R extends Comparable>(fn: CallbackFnRO<T, R>): T;
  }
}

Array.prototype.maxBy = function <T, R extends Comparable>(this: T[], fn: CallbackFn<T, R>): T {
  if (this.length === 0) return undefined!;
  let max = this[0];
  let maxValue = fn(max, 0, this);
  for (let i = 1; i < this.length; i++) {
    const value = fn(this[i], i, this);
    if (compare(value, maxValue!) > 0) {
      max = this[i]!;
      maxValue = value;
    }
  }
  return max;
};
