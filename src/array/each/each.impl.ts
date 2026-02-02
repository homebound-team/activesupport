import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Executes a function for each element and returns the original array for chaining.
 * Use this instead of `forEach` when you need to continue a method chain.
 * @param fn A function to execute for each element
 * @returns The original array
 * @example [1, 2, 3].each(n => console.log(n)).map(n => n * 2) //=> [2, 4, 6]
 * @example [].each(n => console.log(n)) //=> []
 */
export function each<T>(arr: T[], fn: CallbackFn<T>): T[];
/**
 * Executes a function for each element and returns the original array for chaining.
 * Use this instead of `forEach` when you need to continue a method chain.
 * @param fn A function to execute for each element
 * @returns The original array
 * @example [1, 2, 3].each(n => console.log(n)).map(n => n * 2) //=> [2, 4, 6]
 * @example [].each(n => console.log(n)) //=> []
 */
export function each<T>(arr: readonly T[], fn: CallbackFnRO<T>): readonly T[];
export function each<T>(arr: readonly T[], fn: CallbackFnEither<T>): readonly T[] {
  arr.forEach(fn as CallbackFnRO<T>);
  return arr;
}
