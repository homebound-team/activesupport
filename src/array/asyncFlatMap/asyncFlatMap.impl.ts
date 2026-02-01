import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export async function asyncFlatMap<T, V>(arr: T[], fn: CallbackFn<T, Promise<V | V[]>>): Promise<V[]>;
export async function asyncFlatMap<T, V>(arr: readonly T[], fn: CallbackFnRO<T, Promise<V | V[]>>): Promise<V[]>;
export async function asyncFlatMap<T, V>(arr: readonly T[], fn: CallbackFnEither<T, Promise<V | V[]>>): Promise<V[]> {
  return Promise.all(arr.map(fn as CallbackFnRO<T, Promise<V | V[]>>)).then((result) => result.flat(1) as V[]);
}
