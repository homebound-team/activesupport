import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { Comparable, compare } from "src/utils";

export function max<T extends Comparable>(arr: readonly T[]): T;
export function max<T, R extends Comparable>(arr: T[], fn: CallbackFn<T, R>): R;
export function max<T, R extends Comparable>(arr: readonly T[], fn: CallbackFnRO<T, R>): R;
export function max<T, R extends Comparable>(arr: readonly T[], fn?: CallbackFnEither<T, R>): R {
  const values = fn ? ((arr as T[]).map(fn) as R[]) : (arr as unknown as R[]);
  let max = values[0];
  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (compare(value, max!) > 0) max = value;
  }
  return max!;
}
