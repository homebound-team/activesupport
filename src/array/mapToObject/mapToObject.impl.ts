import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { MaybePromise, maybePromiseAllThen } from "src/utils";

/**
 * Maps each element of an array to a key-value pair, then converts the result to an object.
 * Similar to `Object.fromEntries(arr.map(fn))`.
 * @param arr The array to map
 * @param fn A function that returns a [key, value] tuple for each element
 * @returns An object constructed from the key-value pairs
 * @example mapToObject(["a", "b", "c"], (el, i) => [el, i]) //=> {a: 0, b: 1, c: 2}
 * @example mapToObject([], (el, i) => [el, i]) //=> {}
 */
export function mapToObject<T, K extends PropertyKey, V>(arr: T[], fn: CallbackFn<T, readonly [K, V]>): Record<K, V>;
/**
 * Maps each element of an array to a key-value pair using an async callback, then converts the result to an object.
 * @param arr The array to map
 * @param fn An async function that returns a [key, value] tuple for each element
 * @returns A promise resolving to an object constructed from the key-value pairs
 * @example await mapToObject(["a", "b"], async (el, i) => [el, i]) //=> {a: 0, b: 1}
 */
export function mapToObject<T, K extends PropertyKey, V>(
  arr: T[],
  fn: CallbackFn<T, Promise<readonly [K, V]>>,
): Promise<Record<K, V>>;
/**
 * Maps each element of an array to a key-value pair, then converts the result to an object.
 * Similar to `Object.fromEntries(arr.map(fn))`.
 * @param arr The array to map
 * @param fn A function that returns a [key, value] tuple for each element
 * @returns An object constructed from the key-value pairs
 * @example mapToObject(["a", "b", "c"], (el, i) => [el, i]) //=> {a: 0, b: 1, c: 2}
 * @example mapToObject([], (el, i) => [el, i]) //=> {}
 */
export function mapToObject<T, K extends PropertyKey, V>(
  arr: readonly T[],
  fn: CallbackFnRO<T, readonly [K, V]>,
): Record<K, V>;
/**
 * Maps each element of an array to a key-value pair using an async callback, then converts the result to an object.
 * @param arr The array to map
 * @param fn An async function that returns a [key, value] tuple for each element
 * @returns A promise resolving to an object constructed from the key-value pairs
 * @example await mapToObject(["a", "b"], async (el, i) => [el, i]) //=> {a: 0, b: 1}
 */
export function mapToObject<T, K extends PropertyKey, V>(
  arr: readonly T[],
  fn: CallbackFnRO<T, Promise<readonly [K, V]>>,
): Promise<Record<K, V>>;
export function mapToObject<T, K extends PropertyKey, V>(
  arr: readonly T[],
  fn: CallbackFnEither<T, MaybePromise<readonly [K, V]>>,
): MaybePromise<Record<K, V>> {
  const maybePromises = (arr as T[]).map(fn);
  return maybePromiseAllThen(maybePromises, Object.fromEntries);
}
