import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { keyByObject } from "./keyByObject.impl";

declare global {
  interface Array<T> {
    /**
     * Creates a Map from an array, indexed by any object key (not limited to property keys).
     * Throws an error if duplicate keys are found for different elements.
     * Useful when keys are objects or complex types.
     * @param fn A function that returns the key (can be any object) for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A Map from keys to values
     * @example [{id: 1, data: {x: 1}}].keyByObject(item => item.data) //=> Map{{x: 1} => {id: 1, data: {x: 1}}}
     */
    keyByObject<O, R = T>(fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, R>): Map<O, R>;
  }

  interface ReadonlyArray<T> {
    /**
     * Creates a Map from an array, indexed by any object key (not limited to property keys).
     * Throws an error if duplicate keys are found for different elements.
     * Useful when keys are objects or complex types.
     * @param fn A function that returns the key (can be any object) for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A Map from keys to values
     * @example [{id: 1, data: {x: 1}}].keyByObject(item => item.data) //=> Map{{x: 1} => {id: 1, data: {x: 1}}}
     */
    keyByObject<O, R = T>(fn: CallbackFnRO<T, O>, valueFn?: CallbackFnRO<T, R>): Map<O, R>;
  }
}

Array.prototype.keyByObject = function <O, T, R = T>(
  this: T[],
  fn: CallbackFn<T, O>,
  valueFn?: CallbackFn<T, R>,
): Map<O, R> {
  return keyByObject(this, fn, valueFn);
};
