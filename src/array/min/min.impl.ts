import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { Comparable, compare } from "src/utils";

export function min<T extends Comparable>(arr: readonly T[]): T;
export function min<T, R extends Comparable>(arr: T[], fn: CallbackFn<T, R>): R;
export function min<T, R extends Comparable>(arr: readonly T[], fn: CallbackFnRO<T, R>): R;
export function min<T, R extends Comparable>(arr: readonly T[], fn?: CallbackFnEither<T, R>): R {
  const values = fn ? ((arr as T[]).map(fn) as R[]) : (arr as unknown as R[]);
  let min = values[0];
  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (compare(value, min!) < 0) min = value;
  }
  return min!;
}
