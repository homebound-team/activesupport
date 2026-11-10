import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { KeysOfType } from "src/utils";
import { keyBy } from "./keyBy.impl";

declare global {
  interface Array<T> {
    /**
     * Creates a record from an array, indexed by a field value from each element.
     * Throws an error if duplicate keys are found for different elements. Use `groupBy` to allow duplicates.
     * @param field The field name to use as the key
     * @returns A record mapping field values to elements
     * @example [{name: "Alice", age: 25}].keyBy("name") //=> {Alice: {name: "Alice", age: 25}}
     */
    keyBy<K extends KeysOfType<T, PropertyKey>, TK extends PropertyKey = T[K] & PropertyKey>(field: K): Record<TK, T>;
    /**
     * Creates a record from an array, indexed by a key extracted from each element.
     * Throws an error if duplicate keys are found for different elements. Use `groupBy` to allow duplicates.
     * @param fn A function that returns the key for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A record mapping keys to values
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name) //=> {Alice: {name: "Alice", age: 25}}
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name, p => p.age) //=> {Alice: 25}
     * @example [{name: "a"}, {name: "a"}].keyBy(p => p.name) // throws "a already had a value assigned"
     */
    keyBy<K extends PropertyKey, TK extends keyof T, R = T>(
      fn: CallbackFn<T, K>,
      valueFn?: CallbackFn<T, R>,
    ): Record<K, R>;
  }

  interface ReadonlyArray<T> {
    /**
     * Creates a record from an array, indexed by a field value from each element.
     * Throws an error if duplicate keys are found for different elements. Use `groupBy` to allow duplicates.
     * @param field The field name to use as the key
     * @returns A record mapping field values to elements
     * @example [{name: "Alice", age: 25}].keyBy("name") //=> {Alice: {name: "Alice", age: 25}}
     */
    keyBy<K extends KeysOfType<T, PropertyKey>, TK extends PropertyKey = T[K] & PropertyKey>(field: K): Record<TK, T>;
    /**
     * Creates a record from an array, indexed by a key extracted from each element.
     * Throws an error if duplicate keys are found for different elements. Use `groupBy` to allow duplicates.
     * @param fn A function that returns the key for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A record mapping keys to values
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name) //=> {Alice: {name: "Alice", age: 25}}
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name, p => p.age) //=> {Alice: 25}
     * @example [{name: "a"}, {name: "a"}].keyBy(p => p.name) // throws "a already had a value assigned"
     */
    keyBy<K extends PropertyKey, TK extends keyof T, R = T>(
      fn: CallbackFnRO<T, K>,
      valueFn?: CallbackFnRO<T, R>,
    ): Record<K, R>;
  }
}

Array.prototype.keyBy = function <T, K extends PropertyKey, R = T>(
  this: T[],
  fnOrKey: CallbackFn<T, K> | keyof T,
  valueFn?: CallbackFn<T, R>,
) {
  return keyBy(this, fnOrKey as any, valueFn as any);
} as any;
