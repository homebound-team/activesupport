import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export async function asyncForEach<T>(arr: T[], fn: CallbackFn<T, Promise<any>>): Promise<void>;
export async function asyncForEach<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<any>>): Promise<void>;
export async function asyncForEach<T>(arr: readonly T[], fn: CallbackFnEither<T, Promise<any>>): Promise<void> {
  await Promise.all(arr.map(fn as CallbackFnRO<T, Promise<any>>));
}
