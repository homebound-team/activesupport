import { asyncMap } from "src/array/asyncMap/asyncMap.impl";
import { partition } from "src/array/partition/partition.impl";
import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { MaybePromise } from "src/utils";

export async function asyncPartition<T>(arr: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<[T[], T[]]>;
export async function asyncPartition<T, U>(
  arr: T[],
  fn: CallbackFn<T, Promise<boolean>>,
  valueFn: CallbackFn<T, MaybePromise<U>>,
): Promise<[U[], U[]]>;
export async function asyncPartition<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<boolean>>): Promise<[T[], T[]]>;
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
