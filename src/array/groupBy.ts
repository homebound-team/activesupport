import { CallbackFn, CallbackFnRO } from "./index";

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
    /**
     * Groups array elements by any object key (not limited to property keys like strings/numbers).
     * Returns an array of [key, values] tuples. Use this when grouping by objects or complex keys.
     * @param fn A function that returns the grouping key (can be any object) for each element
     * @param valueFn Optional function to transform each element before grouping
     * @returns An array of [key, values[]] tuples
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupByObject(p => ({decade: Math.floor(p.age / 10)})) //=> [[{decade: 2}, [{name: "Alice", age: 25}, {name: "Bob", age: 25}]]]
     */
    groupByObject<O, Y = T>(fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>): [O, Y[]][];
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
    /**
     * Groups array elements by any object key (not limited to property keys like strings/numbers).
     * Returns an array of [key, values] tuples. Use this when grouping by objects or complex keys.
     * @param fn A function that returns the grouping key (can be any object) for each element
     * @param valueFn Optional function to transform each element before grouping
     * @returns An array of [key, values[]] tuples
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupByObject(p => ({decade: Math.floor(p.age / 10)})) //=> [[{decade: 2}, [{name: "Alice", age: 25}, {name: "Bob", age: 25}]]]
     */
    groupByObject<O, Y = T>(fn: CallbackFnRO<T, O>, valueFn?: CallbackFnRO<T, Y>): [O, Y[]][];
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

Array.prototype.groupByObject = function <T, O, Y = T>(
  this: T[],
  fn: CallbackFn<T, O>,
  valueFn?: CallbackFn<T, Y>,
): [O, Y[]][] {
  const result = new Map<O, Y[]>();
  this.forEach((e, i, a) => {
    const key = fn(e, i, a);
    let group = result.get(key);
    if (group === undefined) {
      group = [];
      result.set(key, group);
    }
    group.push(valueFn ? valueFn(e, i, a) : (e as any as Y));
  });
  return [...result.entries()];
};
