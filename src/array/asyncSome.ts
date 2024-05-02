import { MaybePromise, maybePromiseThen } from "../utils";
import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    asyncSome(predicate: CallbackFn<T, MaybePromise<boolean>>): Promise<boolean>;
  }

  interface ReadonlyArray<T> {
    asyncSome(predicate: CallbackFnRO<T, MaybePromise<boolean>>): Promise<boolean>;
  }
}

Array.prototype.asyncSome = async function <T>(
  this: T[],
  predicate: CallbackFn<T, MaybePromise<boolean>>,
): Promise<boolean> {
  const asyncResults = this.map((e, i, a) =>
    maybePromiseThen(predicate(e, i, a), (result) => result || Promise.reject()),
  );
  return Promise.any(asyncResults).catch(() => false);
};
