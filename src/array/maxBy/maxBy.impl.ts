import { CallbackFn } from "src/array/utils";
import { Comparable, compare } from "src/utils";

export function maxByImpl<T, R extends Comparable>(this: T[], fn: CallbackFn<T, R>): T {
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
}

export function maxBy<T, R extends Comparable>(arr: T[], fn: CallbackFn<T, R>): T {
  return maxByImpl.call<T[], [CallbackFn<T, R>], T>(arr, fn);
}
