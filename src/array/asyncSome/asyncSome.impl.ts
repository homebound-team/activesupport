import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export async function asyncSome<T>(arr: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<boolean>;
export async function asyncSome<T>(arr: readonly T[], fn: CallbackFnRO<T, Promise<boolean>>): Promise<boolean>;
export async function asyncSome<T>(arr: readonly T[], fn: CallbackFnEither<T, Promise<boolean>>): Promise<boolean> {
  const asyncResults = arr.map((e, i, a) => fn(e, i, a as T[]).then((result) => result || Promise.reject()));
  return Promise.any(asyncResults).catch(() => false);
}
