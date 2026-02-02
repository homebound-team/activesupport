import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { Comparable, compare } from "src/utils";

/**
 * Returns the element from an array with the maximum value as determined by the callback function.
 * @param arr The array to search
 * @param fn A function that returns a comparable value for each element
 * @returns The element with the largest value
 * @example maxBy([{foo: 1}, {foo: 2}, {foo: 3}], v => v.foo) //=> {foo: 3}
 * @example maxBy(["a", "abc", "ab"], s => s.length) //=> "abc"
 * @example maxBy([], x => x) //=> undefined
 */
export function maxBy<T, R extends Comparable>(arr: T[], fn: CallbackFn<T, R>): T;
/**
 * Returns the element from an array with the maximum value as determined by the callback function.
 * @param arr The array to search
 * @param fn A function that returns a comparable value for each element
 * @returns The element with the largest value
 * @example maxBy([{foo: 1}, {foo: 2}, {foo: 3}], v => v.foo) //=> {foo: 3}
 * @example maxBy(["a", "abc", "ab"], s => s.length) //=> "abc"
 * @example maxBy([], x => x) //=> undefined
 */
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
