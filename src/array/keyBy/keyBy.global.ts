import { keyBy } from "src/array/keyBy/keyBy.impl";
import { CallbackFn, CallbackFnRO } from "src/array/utils";

declare global {
  interface Array<T> {
    /**
     * Creates a record indexed by a field value from each element.
     * Throws an error if duplicate keys are found for different elements.  Use `groupBy` to allow duplicates.
     * @param field The field name to use as the key
     * @returns A record mapping field values to elements
     * @example [{name: "Alice", age: 25}].keyBy("name") //=> {Alice: {name: "Alice", age: 25}}
     */
    keyBy<K extends keyof T>(field: T[K] extends PropertyKey ? T[K] : never): Record<PropertyKey, T>;
    /**
     * Creates a record indexed by a field value from each element.
     * Throws an error if duplicate keys are found for different elements.  Use `groupBy` to allow duplicates.
     * @param fn A function that returns the key for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A record mapping keys to values
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name) //=> {Alice: {name: "Alice", age: 25}}
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name, p => p.age) //=> {Alice: 25}
     * @example [{name: "a"}, {name: "a"}].keyBy(p => p.name) // throws "a already had a value assigned"
     */
    keyBy<K extends PropertyKey, Y = T>(fn: CallbackFn<T, K>, valueFn?: CallbackFn<T, Y>): Record<K, Y>;
  }

  interface ReadonlyArray<T> {
    /**
     * Creates a record indexed by a field value from each element.
     * Throws an error if duplicate keys are found for different elements.  Use `groupBy` to allow duplicates.
     * @param field The field name to use as the key
     * @returns A record mapping field values to elements
     * @example [{name: "Alice", age: 25}].keyBy("name") //=> {Alice: {name: "Alice", age: 25}}
     */
    keyBy<K extends keyof T>(field: T[K] extends PropertyKey ? T[K] : never): Record<PropertyKey, T>;
    /**
     * Creates a record indexed by a field value from each element.
     * Throws an error if duplicate keys are found for different elements.  Use `groupBy` to allow duplicates.
     * @param fn A function that returns the key for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A record mapping keys to values
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name) //=> {Alice: {name: "Alice", age: 25}}
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name, p => p.age) //=> {Alice: 25}
     * @example [{name: "a"}, {name: "a"}].keyBy(p => p.name) // throws "a already had a value assigned"
     */
    keyBy<K extends PropertyKey, Y = T>(fn: CallbackFnRO<T, K>, valueFn?: CallbackFnRO<T, Y>): Record<K, Y>;
  }
}

Array.prototype.keyBy = function <T, K extends PropertyKey, Y = T>(
  this: T[],
  fnOrKey: CallbackFn<T, K> | keyof T,
  valueFn?: CallbackFn<T, Y>,
) {
  return keyBy(this, fnOrKey as any, valueFn);
};
