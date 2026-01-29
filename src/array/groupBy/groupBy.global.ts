import { CallbackFn, CallbackFnRO } from "src/array/utils";

declare global {
  interface Array<T> {
    /**
     * Groups array elements into a record by a key extracted from each element.
     * Optionally transforms values using a value function.
     * @param fn A function that returns the grouping key for each element
     * @param valueFn Optional function to transform each element before grouping
     * @returns A record mapping keys to arrays of grouped values
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupBy(p => p.age) //=> {25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}]}
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 30}].groupBy(p => p.age, p => p.name) //=> {25: ["Alice"], 30: ["Bob"]}
     * @example [].groupBy(p => p.key) //=> {}
     */
    groupBy<K extends PropertyKey, Y = T>(fn: CallbackFn<T, K>, valueFn?: CallbackFn<T, Y>): Record<K, Y[]>;
  }

  interface ReadonlyArray<T> {
    /**
     * Groups array elements into a record by a key extracted from each element.
     * Optionally transforms values using a value function.
     * @param fn A function that returns the grouping key for each element
     * @param valueFn Optional function to transform each element before grouping
     * @returns A record mapping keys to arrays of grouped values
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupBy(p => p.age) //=> {25: [{name: "Alice", age: 25}, {name: "Bob", age: 25}]}
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 30}].groupBy(p => p.age, p => p.name) //=> {25: ["Alice"], 30: ["Bob"]}
     * @example [].groupBy(p => p.key) //=> {}
     */
    groupBy<K extends PropertyKey, Y = T>(fn: CallbackFnRO<T, K>, valueFn?: CallbackFnRO<T, Y>): Record<K, Y[]>;
  }
}

Array.prototype.groupBy = function <K extends PropertyKey, T, Y = T>(
  this: T[],
  fn: CallbackFn<T, K>,
  valueFn?: CallbackFn<T, Y>,
): Record<K, Y[]> {
  const result = {} as Record<K, Y[]>;
  this.forEach((e, i, a) => {
    const group = fn(e, i, a);
    result[group] ??= [];
    result[group].push(valueFn ? valueFn(e, i, a) : (e as any as Y));
  });
  return result;
};
