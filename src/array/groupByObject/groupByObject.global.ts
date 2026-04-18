import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { groupByObject } from "./groupByObject.impl";

declare global {
  interface Array<T> {
    /**
     * Groups elements of an array by any object key (not limited to property keys like strings/numbers).
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
     * Groups elements of an array by any object key (not limited to property keys like strings/numbers).
     * Returns an array of [key, values] tuples. Use this when grouping by objects or complex keys.
     * @param fn A function that returns the grouping key (can be any object) for each element
     * @param valueFn Optional function to transform each element before grouping
     * @returns An array of [key, values[]] tuples
     * @example [{name: "Alice", age: 25}, {name: "Bob", age: 25}].groupByObject(p => ({decade: Math.floor(p.age / 10)})) //=> [[{decade: 2}, [{name: "Alice", age: 25}, {name: "Bob", age: 25}]]]
     */
    groupByObject<O, Y = T>(fn: CallbackFnRO<T, O>, valueFn?: CallbackFnRO<T, Y>): [O, Y[]][];
  }
}

Array.prototype.groupByObject = function <T, O, Y = T>(
  this: T[],
  fn: CallbackFn<T, O>,
  valueFn?: CallbackFn<T, Y>,
): [O, Y[]][] {
  return groupByObject(this, fn, valueFn);
};
