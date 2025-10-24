import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Creates a record indexed by a field value from each element.
     * Throws an error if duplicate keys are found.
     * @param field The field name to use as the key
     * @returns A record mapping field values to elements
     * @example [{name: "Alice", age: 25}].keyBy("name") //=> {Alice: {name: "Alice", age: 25}}
     */
    keyBy<K extends keyof T>(field: T[K] extends PropertyKey ? T[K] : never): Record<PropertyKey, T>;
    /**
     * Creates a record indexed by a key extracted from each element.
     * Throws an error if duplicate keys are found. Use `groupBy` if you want to allow duplicates.
     * @param fn A function that returns the key for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A record mapping keys to values
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name) //=> {Alice: {name: "Alice", age: 25}}
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name, p => p.age) //=> {Alice: 25}
     * @example [{name: "a"}, {name: "a"}].keyBy(p => p.name) // throws "a already had a value assigned"
     */
    keyBy<K extends PropertyKey, Y = T>(fn: CallbackFn<T, K>, valueFn?: CallbackFn<T, Y>): Record<K, Y>;
    /**
     * Creates a Map indexed by any object key (not limited to property keys).
     * Throws an error if duplicate keys are found. Useful when keys are objects or complex types.
     * @param fn A function that returns the key (can be any object) for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A Map from keys to values
     * @example [{id: 1, data: {x: 1}}].keyByObject(item => item.data) //=> Map{{x: 1} => {id: 1, data: {x: 1}}}
     */
    keyByObject<O, Y = T>(this: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>): Map<O, Y>;
  }

  interface ReadonlyArray<T> {
    /**
     * Creates a record indexed by a field value from each element.
     * Throws an error if duplicate keys are found.
     * @param field The field name to use as the key
     * @returns A record mapping field values to elements
     * @example [{name: "Alice", age: 25}].keyBy("name") //=> {Alice: {name: "Alice", age: 25}}
     */
    keyBy<K extends keyof T>(field: T[K] extends PropertyKey ? T[K] : never): Record<PropertyKey, T>;
    /**
     * Creates a record indexed by a key extracted from each element.
     * Throws an error if duplicate keys are found. Use `groupBy` if you want to allow duplicates.
     * @param fn A function that returns the key for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A record mapping keys to values
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name) //=> {Alice: {name: "Alice", age: 25}}
     * @example [{name: "Alice", age: 25}].keyBy(p => p.name, p => p.age) //=> {Alice: 25}
     * @example [{name: "a"}, {name: "a"}].keyBy(p => p.name) // throws "a already had a value assigned"
     */
    keyBy<K extends PropertyKey, Y = T>(fn: CallbackFnRO<T, K>, valueFn?: CallbackFnRO<T, Y>): Record<K, Y>;
    /**
     * Creates a Map indexed by any object key (not limited to property keys).
     * Throws an error if duplicate keys are found. Useful when keys are objects or complex types.
     * @param fn A function that returns the key (can be any object) for each element
     * @param valueFn Optional function to transform each element before storing
     * @returns A Map from keys to values
     * @example [{id: 1, data: {x: 1}}].keyByObject(item => item.data) //=> Map{{x: 1} => {id: 1, data: {x: 1}}}
     */
    keyByObject<O, Y = T>(this: T[], fn: CallbackFnRO<T, O>, valueFn?: CallbackFnRO<T, Y>): Map<O, Y>;
  }
}

Array.prototype.keyBy = function <
  T,
  K extends PropertyKey,
  TK extends keyof T,
  TKK extends T[TK] extends K ? TK : never,
  Y = T,
>(this: T[], fnOrKey: CallbackFn<T, K> | TKK, valueFn?: CallbackFn<T, Y>) {
  const result = {} as Record<K, Y>;
  const fn = typeof fnOrKey === "function" ? fnOrKey : (x: T) => x[fnOrKey] as K;
  this.forEach((e, i, a) => {
    const group = fn(e, i, a);
    if (result[group] !== undefined) {
      throw new Error(`${String(group)} already had a value assigned`);
    }
    result[group] = valueFn ? valueFn(e, i, a) : (e as any as Y);
  });
  return result;
};

Array.prototype.keyByObject = function <O, T, Y = T>(this: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>) {
  const result = new Map<O, Y>();
  this.forEach((e, i, a) => {
    const group = fn(e, i, a);
    if (result.has(group)) {
      throw new Error(`${String(group)} already had a value assigned`);
    }
    result.set(group, valueFn ? valueFn(e, i, a) : (e as any as Y));
  });
  return result;
};
