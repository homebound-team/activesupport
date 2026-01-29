import { minByImpl } from "src/array/minBy/minBy.impl";
import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { Comparable } from "src/utils";

declare global {
  interface Array<T> {
    /**
     * Returns the element with the minimum value as determined by the callback function.
     * @param fn A function that returns a comparable value for each element
     * @returns The element with the smallest value
     * @example [{foo: 1}, {foo: 2}, {foo: 3}].minBy(v => v.foo) //=> {foo: 1}
     * @example ["abc", "a", "ab"].minBy(s => s.length) //=> "a"
     * @example [].minBy(x => x) //=> undefined
     */
    minBy<R extends Comparable>(fn: CallbackFn<T, R>): T;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the element with the minimum value as determined by the callback function.
     * @param fn A function that returns a comparable value for each element
     * @returns The element with the smallest value
     * @example [{foo: 1}, {foo: 2}, {foo: 3}].minBy(v => v.foo) //=> {foo: 1}
     * @example ["abc", "a", "ab"].minBy(s => s.length) //=> "a"
     * @example [].minBy(x => x) //=> undefined
     */
    minBy<R extends Comparable>(fn: CallbackFnRO<T, R>): T;
  }
}

Array.prototype.minBy = minByImpl;
