import { CallbackFn, ToArray } from "src/array/utils";
import { Comparable, compare } from "src/utils";

export function minImpl<T, R extends Comparable>(this: ToArray<Comparable>, fn?: CallbackFn<T, R>): R {
  const values = fn ? ((this as T[]).map(fn) as R[]) : (this as R[]);
  let min = values[0];
  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (compare(value, min!) < 0) min = value;
  }
  return min!;
}

export function min<T, R extends Comparable>(arr: ToArray<Comparable>, fn?: CallbackFn<T, R>): R {
  return minImpl.call<ToArray<Comparable>, [CallbackFn<T, R> | undefined], R>(arr, fn);
}
