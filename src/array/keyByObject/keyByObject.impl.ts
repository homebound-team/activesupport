import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Creates a Map indexed by any object key (not limited to property keys).
 * Throws an error if duplicate keys are found for different elements.
 * Useful when keys are objects or complex types.
 * @param fn A function that returns the key (can be any object) for each element
 * @param valueFn Optional function to transform each element before storing
 * @returns A Map from keys to values
 * @example [{id: 1, data: {x: 1}}].keyByObject(item => item.data) //=> Map{{x: 1} => {id: 1, data: {x: 1}}}
 */
export function keyByObject<O, T, R = T>(arr: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, R>): Map<O, R>;
/**
 * Creates a Map indexed by any object key (not limited to property keys).
 * Throws an error if duplicate keys are found for different elements.
 * Useful when keys are objects or complex types.
 * @param fn A function that returns the key (can be any object) for each element
 * @param valueFn Optional function to transform each element before storing
 * @returns A Map from keys to values
 * @example [{id: 1, data: {x: 1}}].keyByObject(item => item.data) //=> Map{{x: 1} => {id: 1, data: {x: 1}}}
 */
export function keyByObject<O, T, R = T>(
  arr: readonly T[],
  fn: CallbackFnRO<T, O>,
  valueFn?: CallbackFnRO<T, R>,
): Map<O, R>;
export function keyByObject<O, T, R = T>(
  arr: readonly T[],
  fn: CallbackFnEither<T, O>,
  valueFn?: CallbackFnEither<T, R>,
): Map<O, R> {
  const result = new Map<O, R>();
  arr.forEach((e, i, a) => {
    const group = fn(e, i, a as T[]);
    const value = valueFn ? valueFn(e, i, a as T[]) : (e as any as R);
    if (result.has(group)) {
      if (result.get(group) !== value) throw new Error(`${String(group)} already had a value assigned`);
    } else {
      result.set(group, value);
    }
  });
  return result;
}
