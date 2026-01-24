import { MaybePromise, maybePromiseAllThen } from "../utils";
import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Maps each element to a key-value pair, then converts the result to an object.
     * Similar to `Object.fromEntries(array.map(fn))`.
     * @param fn A function that returns a [key, value] tuple for each element
     * @returns An object constructed from the key-value pairs
     * @example ["a", "b", "c"].mapToObject((el, i) => [el, i]) //=> {a: 0, b: 1, c: 2}
     * @example [].mapToObject((el, i) => [el, i]) //=> {}
     */
    mapToObject<K extends PropertyKey, V>(fn: CallbackFn<T, readonly [K, V]>): Record<K, V>;
    /**
     * Maps each element to a key-value pair using an async callback, then converts the result to an object.
     * @param fn An async function that returns a [key, value] tuple for each element
     * @returns A promise resolving to an object constructed from the key-value pairs
     * @example await ["a", "b"].mapToObject(async (el, i) => [el, i]) //=> {a: 0, b: 1}
     */
    mapToObject<K extends PropertyKey, V>(fn: CallbackFn<T, Promise<readonly [K, V]>>): Promise<Record<K, V>>;
  }

  interface ReadonlyArray<T> {
    /**
     * Maps each element to a key-value pair, then converts the result to an object.
     * Similar to `Object.fromEntries(array.map(fn))`.
     * @param fn A function that returns a [key, value] tuple for each element
     * @returns An object constructed from the key-value pairs
     * @example ["a", "b", "c"].mapToObject((el, i) => [el, i]) //=> {a: 0, b: 1, c: 2}
     * @example [].mapToObject((el, i) => [el, i]) //=> {}
     */
    mapToObject<K extends PropertyKey, V>(fn: CallbackFnRO<T, readonly [K, V]>): Record<K, V>;
    /**
     * Maps each element to a key-value pair using an async callback, then converts the result to an object.
     * @param fn An async function that returns a [key, value] tuple for each element
     * @returns A promise resolving to an object constructed from the key-value pairs
     * @example await ["a", "b"].mapToObject(async (el, i) => [el, i]) //=> {a: 0, b: 1}
     */
    mapToObject<K extends PropertyKey, V>(fn: CallbackFnRO<T, Promise<readonly [K, V]>>): Promise<Record<K, V>>;
  }
}

function mapToObject<T, K extends PropertyKey, V>(fn: CallbackFn<T, readonly [K, V]>): Record<K, V>;
function mapToObject<T, K extends PropertyKey, V>(fn: CallbackFn<T, Promise<readonly [K, V]>>): Promise<Record<K, V>>;
function mapToObject<T, K extends PropertyKey, V>(
  this: T[],
  fn: CallbackFn<T, MaybePromise<readonly [K, V]>>,
): MaybePromise<Record<K, V>> {
  const maybePromises = this.map(fn);
  return maybePromiseAllThen(maybePromises, (r) => r.toObject());
}

Array.prototype.mapToObject = mapToObject;
