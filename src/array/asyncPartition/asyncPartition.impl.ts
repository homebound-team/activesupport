import { asyncMap } from "src/array/asyncMap/asyncMap.impl";
import { partition } from "src/array/partition/partition.impl";
import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { MaybePromise } from "src/utils";

/**
 * Splits the array into two using an async callback: elements that satisfy it and elements that don't.
 * @param fn An async function to test each element
 * @returns A promise resolving to a tuple of [matches, non-matches]
 * @example await ["foo1", "bar", "foo2"].asyncPartition(async s => s.startsWith("foo")) //=> [["foo1", "foo2"], ["bar"]]
 * @example await [].asyncPartition(async () => true) //=> [[], []]
 */
export async function asyncPartition<T>(arr: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<[T[], T[]]>;
/**
 * Splits the array into two using an async callback, transforming elements with valueFn.
 * @param fn An async function to test each element
 * @param valueFn A function to transform each element before adding to result
 * @returns A promise resolving to a tuple of [transformed matches, transformed non-matches]
 */
export async function asyncPartition<T, U>(
  arr: T[],
  fn: CallbackFn<T, Promise<boolean>>,
  valueFn: CallbackFn<T, MaybePromise<U>>,
): Promise<[U[], U[]]>;
/**
 * Splits the array into two using an async callback: elements that satisfy it and elements that don't.
 * @param fn An async function to test each element
 * @returns A promise resolving to a tuple of [matches, non-matches]
 * @example await ["foo1", "bar", "foo2"].asyncPartition(async s => s.startsWith("foo")) //=> [["foo1", "foo2"], ["bar"]]
 * @example await [].asyncPartition(async () => true) //=> [[], []]
 */
export async function asyncPartition<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<boolean>>): Promise<[T[], T[]]>;
/**
 * Splits the array into two using an async callback, transforming elements with valueFn.
 * @param fn An async function to test each element
 * @param valueFn A function to transform each element before adding to result
 * @returns A promise resolving to a tuple of [transformed matches, transformed non-matches]
 */
export async function asyncPartition<T, U>(
  arr: readonly T[],
  fn: CallbackFnRO<T, Promise<boolean>>,
  valueFn: CallbackFnRO<T, MaybePromise<U>>,
): Promise<[U[], U[]]>;
export async function asyncPartition<T, U = T>(
  arr: readonly T[],
  fn: CallbackFnEither<T, Promise<boolean>>,
  valueFn?: CallbackFnEither<T, MaybePromise<U>>,
): Promise<[U[], U[]]> {
  const results = await asyncMap(arr, (e, i, a) =>
    Promise.all([fn(e, i, a as T[]), valueFn ? valueFn(e, i, a as T[]) : (e as any)]),
  );
  return partition(
    results,
    ([result]) => result,
    ([, result]) => result,
  );
}
