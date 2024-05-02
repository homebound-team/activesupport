import { MaybePromise, maybePromiseAllThen } from "../utils";
import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    count(fn: CallbackFn<T, boolean>): number;
    count(fn: CallbackFn<T, Promise<boolean>>): Promise<number>;
  }

  interface ReadonlyArray<T> {
    count(fn: CallbackFnRO<T, boolean>): number;
    count(fn: CallbackFnRO<T, Promise<boolean>>): Promise<number>;
  }
}

function count<T>(this: T[], fn: CallbackFn<T, boolean>): number;
function count<T>(this: T[], fn: CallbackFn<T, Promise<boolean>>): Promise<number>;
function count<T>(this: T[], fn: CallbackFn<T, MaybePromise<boolean>>): MaybePromise<number> {
  const maybePromises = this.map(fn as any) as MaybePromise<boolean>[];
  return maybePromiseAllThen(maybePromises, (result) => result.filter((r) => r).length);
}

Array.prototype.count = count;
