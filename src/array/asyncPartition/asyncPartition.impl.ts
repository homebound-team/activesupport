import { asyncMap } from "src/array/asyncMap/asyncMap.impl";
import { partition } from "src/array/partition/partition.impl";
import { CallbackFn } from "src/array/utils";
import { MaybePromise } from "src/utils";

export async function asyncPartitionImpl<T, U = T>(
  this: T[],
  fn: CallbackFn<T, Promise<boolean>>,
  valueFn?: CallbackFn<T, MaybePromise<U>>,
): Promise<[U[], U[]]> {
  const results = await asyncMap(this, (e, i, a) =>
    Promise.all([fn(e, i, a), valueFn ? valueFn(e, i, a) : (e as any)]),
  );
  return partition(
    results,
    ([result]) => result,
    ([, result]) => result,
  );
}

export async function asyncPartition<T, U = T>(
  arr: T[],
  fn: CallbackFn<T, Promise<boolean>>,
  valueFn?: CallbackFn<T, MaybePromise<U>>,
): Promise<[U[], U[]]> {
  return asyncPartitionImpl.call<
    T[],
    [CallbackFn<T, Promise<boolean>>, CallbackFn<T, MaybePromise<U>> | undefined],
    Promise<[U[], U[]]>
  >(arr, fn, valueFn);
}
