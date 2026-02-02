import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

/**
 * Splits an array into two: elements that satisfy the callback and elements that don't.
 * @param arr The array to partition
 * @param fn A function to test each element
 * @returns A tuple of [matches, non-matches]
 * @example partition(["foo1", "bar", "foo2"], s => s.startsWith("foo")) //=> [["foo1", "foo2"], ["bar"]]
 * @example partition([], () => true) //=> [[], []]
 */
export function partition<T>(arr: T[], fn: CallbackFn<T, boolean>): [T[], T[]];
/**
 * Splits an array into two after transforming elements with valueFn.
 * @param arr The array to partition
 * @param fn A function to test each element
 * @param valueFn A function to transform each element before adding to result
 * @returns A tuple of [transformed matches, transformed non-matches]
 * @example partition([{name: "foo1"}, {name: "bar"}], o => o.name.startsWith("foo"), o => o.name) //=> [["foo1"], ["bar"]]
 */
export function partition<T, U>(arr: T[], fn: CallbackFn<T, boolean>, valueFn: CallbackFn<T, U>): [U[], U[]];
/**
 * Splits an array into two: elements that satisfy the callback and elements that don't.
 * @param arr The array to partition
 * @param fn A function to test each element
 * @returns A tuple of [matches, non-matches]
 * @example partition(["foo1", "bar", "foo2"], s => s.startsWith("foo")) //=> [["foo1", "foo2"], ["bar"]]
 * @example partition([], () => true) //=> [[], []]
 */
export function partition<T>(arr: readonly T[], fn: CallbackFnRO<T, boolean>): [T[], T[]];
/**
 * Splits an array into two after transforming elements with valueFn.
 * @param arr The array to partition
 * @param fn A function to test each element
 * @param valueFn A function to transform each element before adding to result
 * @returns A tuple of [transformed matches, transformed non-matches]
 * @example partition([{name: "foo1"}, {name: "bar"}], o => o.name.startsWith("foo"), o => o.name) //=> [["foo1"], ["bar"]]
 */
export function partition<T, U>(
  arr: readonly T[],
  fn: CallbackFnRO<T, boolean>,
  valueFn: CallbackFnRO<T, U>,
): [U[], U[]];
export function partition<T, U = T>(
  arr: readonly T[],
  fn: CallbackFnEither<T, boolean>,
  valueFn?: CallbackFnEither<T, U>,
): [U[], U[]] {
  const [trueElements, falseElements] = [[] as U[], [] as U[]];
  (arr as T[]).forEach((e, i, a) =>
    (fn(e, i, a) ? trueElements : falseElements).push(valueFn ? valueFn(e, i, a) : (e as any)),
  );
  return [trueElements, falseElements];
}
