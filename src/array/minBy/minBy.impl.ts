import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { Comparable, compare } from "src/utils";

/**
 * Returns the element from an array with the minimum value as determined by the callback function.
 * @param arr The array to search
 * @param fn A function that returns a comparable value for each element
 * @returns The element with the smallest value
 * @example minBy([{foo: 1}, {foo: 2}, {foo: 3}], v => v.foo) //=> {foo: 1}
 * @example minBy(["abc", "a", "ab"], s => s.length) //=> "a"
 * @example minBy([], x => x) //=> undefined
 */
export function minBy<T, R extends Comparable>(arr: T[], fn: CallbackFn<T, R>): T;
/**
 * Returns the element from an array with the minimum value as determined by the callback function.
 * @param arr The array to search
 * @param fn A function that returns a comparable value for each element
 * @returns The element with the smallest value
 * @example minBy([{foo: 1}, {foo: 2}, {foo: 3}], v => v.foo) //=> {foo: 1}
 * @example minBy(["abc", "a", "ab"], s => s.length) //=> "a"
 * @example minBy([], x => x) //=> undefined
 */
export function minBy<T, R extends Comparable>(arr: readonly T[], fn: CallbackFnRO<T, R>): T;
export function minBy<T, R extends Comparable>(arr: readonly T[], fn: CallbackFnEither<T, R>): T {
  if (arr.length === 0) return undefined!;
  let min = arr[0];
  let minValue = fn(min, 0, arr as T[]);
  for (let i = 1; i < arr.length; i++) {
    const value = fn(arr[i], i, arr as T[]);
    if (compare(value, minValue!) < 0) {
      min = arr[i]!;
      minValue = value;
    }
  }
  return min;
}
