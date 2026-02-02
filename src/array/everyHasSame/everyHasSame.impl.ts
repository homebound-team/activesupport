import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Returns true if all elements produce the same value when passed through the callback.
 * @param fn A function that extracts a value to compare from each element
 * @returns True if all elements produce the same value
 * @example [{status: "done"}, {status: "done"}].everyHasSame(o => o.status) //=> true
 * @example [{status: "done"}, {status: "pending"}].everyHasSame(o => o.status) //=> false
 * @example [].everyHasSame(o => o.value) //=> true
 */
export function everyHasSame<T>(arr: T[], fn: CallbackFn<T, unknown>): boolean;
/**
 * Returns true if all elements produce the same value when passed through the callback.
 * @param fn A function that extracts a value to compare from each element
 * @returns True if all elements produce the same value
 * @example [{status: "done"}, {status: "done"}].everyHasSame(o => o.status) //=> true
 * @example [{status: "done"}, {status: "pending"}].everyHasSame(o => o.status) //=> false
 * @example [].everyHasSame(o => o.value) //=> true
 */
export function everyHasSame<T>(arr: readonly T[], fn: CallbackFnRO<T, unknown>): boolean;
export function everyHasSame<T>(arr: readonly T[], fn: CallbackFnEither<T, unknown>): boolean {
  if (arr.length === 0) return true;
  const first = fn(arr[0], 0, arr as T[]);
  for (let i = 1; i < arr.length; i++) {
    if (fn(arr[i], i, arr as T[]) !== first) return false;
  }
  return true;
}
