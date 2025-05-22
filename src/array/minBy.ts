import { Comparable, compare } from "../utils";
import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Returns the minimum value based on a callback function
     * @param fn The callback function to calculate values to compare
     * @returns The minimum value
     * @example [{ foo: 1 }, { foo: 2 }, { foo: 3 }].minBy((v) => v.foo) //=> { foo: 1 }
     */
    minBy<R extends Comparable>(fn: CallbackFn<T, R>): T;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the minimum value based on a callback function
     * @param fn The callback function to calculate values to compare
     * @returns The minimum value
     * @example [{ foo: 1 }, { foo: 2 }, { foo: 3 }].minBy((v) => v.foo) //=> { foo: 1 }
     */
    minBy<R extends Comparable>(fn: CallbackFnRO<T, R>): T;
  }
}

Array.prototype.minBy = function <T, R extends Comparable>(this: T[], fn: CallbackFn<T, R>): T {
  if (this.length === 0) return undefined!;
  let max = this[0];
  let maxValue = fn(max, 0, this);
  for (let i = 1; i < this.length; i++) {
    const value = fn(this[i], i, this);
    if (compare(value, maxValue!) < 0) {
      max = this[i]!;
      maxValue = value;
    }
  }
  return max;
};
