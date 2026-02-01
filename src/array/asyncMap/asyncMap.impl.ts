import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export async function asyncMap<T, V>(arr: T[], fn: CallbackFn<T, Promise<V>>): Promise<V[]>;
export async function asyncMap<T, V>(arr: readonly T[], fn: CallbackFnRO<T, Promise<V>>): Promise<V[]>;
export async function asyncMap<T, V>(arr: readonly T[], fn: CallbackFnEither<T, Promise<V>>): Promise<V[]> {
  return Promise.all(arr.map(fn as CallbackFnRO<T, Promise<V>>));
}
