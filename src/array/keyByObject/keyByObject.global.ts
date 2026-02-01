import { keyByObject } from "src/array/keyByObject/keyByObject.impl";
import { CallbackFn, CallbackFnRO } from "src/array/utils";

declare global {
  interface Array<T> {
    /**
     * Creates a Map indexed by any object key (not limited to property keys).
     * Throws an error if duplicate keys are found for different elements.
     * Useful when keys are objects or complex types.
     * @param fn A function that returns the key (can be any object) for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A Map from keys to values
     * @example [{id: 1, data: {x: 1}}].keyByObject(item => item.data) //=> Map{{x: 1} => {id: 1, data: {x: 1}}}
     */
    keyByObject<O, Y = T>(this: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>): Map<O, Y>;
  }

  interface ReadonlyArray<T> {
    /**
     * Creates a Map indexed by any object key (not limited to property keys).
     * Throws an error if duplicate keys are found for different elements.
     * Useful when keys are objects or complex types.
     * @param fn A function that returns the key (can be any object) for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A Map from keys to values
     * @example [{id: 1, data: {x: 1}}].keyByObject(item => item.data) //=> Map{{x: 1} => {id: 1, data: {x: 1}}}
     */
    keyByObject<O, Y = T>(this: T[], fn: CallbackFnRO<T, O>, valueFn?: CallbackFnRO<T, Y>): Map<O, Y>;
  }
}

Array.prototype.keyByObject = function <T, O, Y = T>(this: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>) {
  return keyByObject(this, fn, valueFn);
};
