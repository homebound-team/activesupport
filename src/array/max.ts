import { Comparable, compare } from "../utils";
import { CallbackFn, CallbackFnRO, ToArray, ToReadonlyArray } from "./index";

declare global {
  interface Array<T> {
    max(this: ToArray<Comparable>): T;
    max<R extends Comparable>(fn: CallbackFn<T, R>): R;
  }

  interface ReadonlyArray<T> {
    max(this: ToReadonlyArray<Comparable>): T;
    max<R extends Comparable>(fn: CallbackFnRO<T, R>): R;
  }
}

Array.prototype.max = function <T, R extends Comparable>(this: ToArray<Comparable> | T[], fn?: CallbackFn<T, R>): R {
  const values = fn ? ((this as T[]).map(fn) as R[]) : (this as R[]);
  let max = values.first;
  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (compare(value, max!) > 0) max = value;
  }
  return max!;
};
