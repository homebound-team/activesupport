import { CallbackFn, ToArray } from "src/array/utils";
import { Comparable, compare } from "src/utils";

export function maxImpl<T, R extends Comparable>(this: ToArray<Comparable> | T[], fn?: CallbackFn<T, R>): R {
  const values = fn ? ((this as T[]).map(fn) as R[]) : (this as R[]);
  let max = values[0];
  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (compare(value, max!) > 0) max = value;
  }
  return max!;
}

export function max<T, R extends Comparable>(arr: ToArray<Comparable> | T[], fn?: CallbackFn<T, R>): R {
  return maxImpl.call<ToArray<Comparable> | T[], [CallbackFn<T, R> | undefined], R>(arr, fn);
}
