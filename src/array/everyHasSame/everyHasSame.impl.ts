import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Returns true if all elements of an array produce the same value when passed through the callback.
 * @param arr The array to check
 * @param fn A function that extracts a value to compare from each element
 * @returns True if all elements produce the same value
 * @example everyHasSame([{status: "done"}, {status: "done"}], o => o.status) //=> true
 * @example everyHasSame([{status: "done"}, {status: "pending"}], o => o.status) //=> false
 * @example everyHasSame([], o => o.value) //=> true
 */
export function everyHasSame<T>(arr: T[], fn: CallbackFn<T, unknown>): boolean;
/**
 * Returns true if all elements of an array produce the same value when passed through the callback.
 * @param arr The array to check
 * @param fn A function that extracts a value to compare from each element
 * @returns True if all elements produce the same value
 * @example everyHasSame([{status: "done"}, {status: "done"}], o => o.status) //=> true
 * @example everyHasSame([{status: "done"}, {status: "pending"}], o => o.status) //=> false
 * @example everyHasSame([], o => o.value) //=> true
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
