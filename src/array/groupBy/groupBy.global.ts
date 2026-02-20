import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { groupBy } from "./groupBy.impl";

declare global {
  interface Array<T> {
    /**
     * Groups elements of the array into a record by a key extracted from each element.
     * Optionally transforms values using a value function.
     * @param fn A function that returns the grouping key for each element
     * @param valueFn Optional function to transform each element before grouping
     * @returns A record mapping keys to arrays of grouped values
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupBy(p => p.age) //=> {25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}]}
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 30}].groupBy(p => p.age, p => p.name) //=> {25: ["Alice"], 30: ["Bob"]}
     * @example [].groupBy(p => p.key) //=> {}
     */
    groupBy<K extends PropertyKey>(fn: CallbackFn<T, K>): Record<K, T[]>;
    /**
     * Groups elements of the array into a record by a key extracted from each element.
     * Optionally transforms values using a value function.
     * @param fn A function that returns the grouping key for each element
     * @param valueFn Optional function to transform each element before grouping
     * @returns A record mapping keys to arrays of grouped values
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupBy(p => p.age) //=> {25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}]}
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 30}].groupBy(p => p.age, p => p.name) //=> {25: ["Alice"], 30: ["Bob"]}
     * @example [].groupBy(p => p.key) //=> {}
     */
    groupBy<K extends PropertyKey, R>(fn: CallbackFn<T, K>, valueFn: CallbackFn<T, R>): Record<K, R[]>;
  }

  interface ReadonlyArray<T> {
    /**
     * Groups elements of the array into a record by a key extracted from each element.
     * Optionally transforms values using a value function.
     * @param fn A function that returns the grouping key for each element
     * @param valueFn Optional function to transform each element before grouping
     * @returns A record mapping keys to arrays of grouped values
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupBy(p => p.age) //=> {25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}]}
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 30}].groupBy(p => p.age, p => p.name) //=> {25: ["Alice"], 30: ["Bob"]}
     * @example [].groupBy(p => p.key) //=> {}
     */
    groupBy<K extends PropertyKey>(fn: CallbackFnRO<T, K>): Record<K, T[]>;
    /**
     * Groups elements of the array into a record by a key extracted from each element.
     * Optionally transforms values using a value function.
     * @param fn A function that returns the grouping key for each element
     * @param valueFn Optional function to transform each element before grouping
     * @returns A record mapping keys to arrays of grouped values
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupBy(p => p.age) //=> {25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}]}
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 30}].groupBy(p => p.age, p => p.name) //=> {25: ["Alice"], 30: ["Bob"]}
     * @example [].groupBy(p => p.key) //=> {}
     */
    groupBy<K extends PropertyKey, R>(fn: CallbackFnRO<T, K>, valueFn: CallbackFnRO<T, R>): Record<K, R[]>;
  }
}

Array.prototype.groupBy = function <K extends PropertyKey, T, Y = T>(
  this: T[],
  fn: CallbackFn<T, K>,
  valueFn?: CallbackFn<T, Y>,
) {
  return groupBy(this, fn as any, valueFn as any);
} as any;
