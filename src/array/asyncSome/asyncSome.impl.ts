import { CallbackFn } from "src/array/utils";
import { MaybePromise, maybePromiseThen } from "src/utils";

export async function asyncSomeImpl<T>(this: T[], predicate: CallbackFn<T, MaybePromise<boolean>>): Promise<boolean> {
  const asyncResults = this.map((e, i, a) =>
    maybePromiseThen(predicate(e, i, a), (result) => result || Promise.reject()),
  );
  return Promise.any(asyncResults).catch(() => false);
}

export async function asyncSome<T>(arr: T[], predicate: CallbackFn<T, MaybePromise<boolean>>): Promise<boolean> {
  return asyncSomeImpl.call<T[], [CallbackFn<T, MaybePromise<boolean>>], Promise<boolean>>(arr, predicate);
}
