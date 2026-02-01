import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { Comparable, compare } from "src/utils";

export function maxBy<T, R extends Comparable>(arr: T[], fn: CallbackFn<T, R>): T;
export function maxBy<T, R extends Comparable>(arr: readonly T[], fn: CallbackFnRO<T, R>): T;
export function maxBy<T, R extends Comparable>(arr: readonly T[], fn: CallbackFnEither<T, R>): T {
  if (arr.length === 0) return undefined!;
  let max = arr[0];
  let maxValue = fn(max, 0, arr as T[]);
  for (let i = 1; i < arr.length; i++) {
    const value = fn(arr[i], i, arr as T[]);
    if (compare(value, maxValue!) > 0) {
      max = arr[i]!;
      maxValue = value;
    }
  }
  return max;
}
