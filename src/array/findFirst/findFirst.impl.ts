import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Iterates through an array and returns the first defined result from the callback function.
 * Stops iteration as soon as a defined value is found.
 * @param arr The array to search
 * @param fn A function that returns a value or undefined for each element
 * @returns The first defined result from the callback, or undefined if none found
 * @example findFirst(["", "hello", "world"], s => s || undefined) //=> "hello"
 * @example findFirst(["not a number", "42", "100"], s => { const n = parseInt(s); return isNaN(n) ? undefined : n }) //=> 42
 * @example findFirst([], s => s) //=> undefined
 */
export function findFirst<T, U>(arr: T[], fn: CallbackFn<T, U | undefined>): U | undefined;
/**
 * Iterates through an array and returns the first defined result from the callback function.
 * Stops iteration as soon as a defined value is found.
 * @param arr The array to search
 * @param fn A function that returns a value or undefined for each element
 * @returns The first defined result from the callback, or undefined if none found
 * @example findFirst(["", "hello", "world"], s => s || undefined) //=> "hello"
 * @example findFirst(["not a number", "42", "100"], s => { const n = parseInt(s); return isNaN(n) ? undefined : n }) //=> 42
 * @example findFirst([], s => s) //=> undefined
 */
export function findFirst<T, U>(arr: readonly T[], fn: CallbackFnRO<T, U | undefined>): U | undefined;
export function findFirst<T, U>(arr: readonly T[], fn: CallbackFnEither<T, U | undefined>): U | undefined {
  for (let i = 0; i < arr.length; i++) {
    const result = fn(arr[i], i, arr as T[]);
    if (result !== undefined) return result;
  }
  return undefined;
}
