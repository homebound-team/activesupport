import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Creates a record from an array, indexed by a field value from each element.
 * Throws an error if duplicate keys are found for different elements. Use `groupBy` to allow duplicates.
 * @param arr The array to index
 * @param field The field name to use as the key
 * @returns A record mapping field values to elements
 * @example keyBy([{name: "Alice", age: 25}], "name") //=> {Alice: {name: "Alice", age: 25}}
 */
export function keyBy<T, K extends keyof T, TK extends T[K] extends PropertyKey ? T[K] : never>(
  arr: readonly T[],
  field: TK,
): Record<TK, T>;
/**
 * Creates a record from an array, indexed by a key extracted from each element.
 * Throws an error if duplicate keys are found for different elements. Use `groupBy` to allow duplicates.
 * @param arr The array to index
 * @param fn A function that returns the key for each element
 * @param valueFn Optional function to transform each element before storing
 * @returns A record mapping keys to values
 * @example keyBy([{name: "Alice", age: 25}], p => p.name) //=> {Alice: {name: "Alice", age: 25}}
 * @example keyBy([{name: "Alice", age: 25}], p => p.name, p => p.age) //=> {Alice: 25}
 * @example keyBy([{name: "a"}, {name: "a"}], p => p.name) // throws "a already had a value assigned"
 */
export function keyBy<T, K extends PropertyKey, TK extends keyof T, R = T>(
  arr: T[],
  fn: CallbackFn<T, K>,
  valueFn?: CallbackFn<T, R>,
): Record<K, R>;
/**
 * Creates a record from an array, indexed by a key extracted from each element.
 * Throws an error if duplicate keys are found for different elements. Use `groupBy` to allow duplicates.
 * @param arr The array to index
 * @param fn A function that returns the key for each element
 * @param valueFn Optional function to transform each element before storing
 * @returns A record mapping keys to values
 * @example keyBy([{name: "Alice", age: 25}], p => p.name) //=> {Alice: {name: "Alice", age: 25}}
 * @example keyBy([{name: "Alice", age: 25}], p => p.name, p => p.age) //=> {Alice: 25}
 * @example keyBy([{name: "a"}, {name: "a"}], p => p.name) // throws "a already had a value assigned"
 */
export function keyBy<T, K extends PropertyKey, TK extends keyof T, R = T>(
  arr: readonly T[],
  fn: CallbackFnRO<T, K>,
  valueFn?: CallbackFnRO<T, R>,
): Record<K, R>;
export function keyBy<T, K extends PropertyKey, TK extends keyof T, TKK extends T[TK] extends K ? TK : never, R = T>(
  arr: readonly T[],
  fnOrKey: CallbackFnEither<T, K> | TKK,
  valueFn?: CallbackFnEither<T, R>,
) {
  const result = {} as Record<K, R>;
  const fn = typeof fnOrKey === "function" ? fnOrKey : undefined;
  const key = typeof fnOrKey === "function" ? undefined : fnOrKey;
  arr.forEach((e, i, a) => {
    const group = fn ? fn(e, i, a as T[]) : (e[key as TKK] as K);
    const value = valueFn ? valueFn(e, i, a as T[]) : (e as any as R);
    if (group in result) {
      if (result[group] !== value) throw new Error(`${String(group)} already had a value assigned`);
    } else {
      result[group] = value;
    }
  });
  return result;
}
