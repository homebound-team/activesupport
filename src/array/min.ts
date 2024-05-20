import { Comparable, compare } from "../utils";
import { CallbackFn, CallbackFnRO, ToArray, ToReadonlyArray } from "./index";

declare global {
  interface Array<T> {
    min(this: ToArray<Comparable>): T;
    min<R extends Comparable>(fn: CallbackFn<T, R>): R;
  }

  interface ReadonlyArray<T> {
    min(this: ToReadonlyArray<Comparable>): T;
    min<R extends Comparable>(fn: CallbackFnRO<T, R>): R;
  }
}

Array.prototype.min = function <T, R extends Comparable>(this: ToArray<Comparable>, fn?: CallbackFn<T, R>): R {
  const values = fn ? ((this as T[]).map(fn) as R[]) : (this as R[]);
  let min = values.first;
  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (compare(value, min!) < 0) min = value;
  }
  return min!;
};
