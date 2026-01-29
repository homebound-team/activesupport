import { CallbackFn } from "src/array/utils";
import { MaybePromise } from "src/utils";

export async function asyncPartitionImpl<T, U = T>(
  this: T[],
  f: CallbackFn<T, Promise<boolean>>,
  valueFn?: CallbackFn<T, MaybePromise<U>>,
): Promise<[U[], U[]]> {
  return this.asyncMap((e, i, a) => Promise.all([f(e, i, a), valueFn ? valueFn(e, i, a) : (e as any)])).then((result) =>
    result.partition(
      ([result]) => result,
      ([, result]) => result,
    ),
  );
}

export async function asyncPartition<T, U = T>(
  arr: T[],
  f: CallbackFn<T, Promise<boolean>>,
  valueFn?: CallbackFn<T, MaybePromise<U>>,
): Promise<[U[], U[]]> {
  return asyncPartitionImpl.call<
    T[],
    [CallbackFn<T, Promise<boolean>>, CallbackFn<T, MaybePromise<U>> | undefined],
    Promise<[U[], U[]]>
  >(arr, f, valueFn);
}
