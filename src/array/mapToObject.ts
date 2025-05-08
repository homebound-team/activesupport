import { MaybePromise, maybePromiseAllThen } from "../utils";
import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    mapToObject<K extends PropertyKey, V>(fn: CallbackFn<T, readonly [K, V]>): Record<K, V>;
    mapToObject<K extends PropertyKey, V>(fn: CallbackFn<T, Promise<readonly [K, V]>>): Promise<Record<K, V>>;
  }

  interface ReadonlyArray<T> {
    mapToObject<K extends PropertyKey, V>(fn: CallbackFnRO<T, readonly [K, V]>): Record<K, V>;
    mapToObject<K extends PropertyKey, V>(fn: CallbackFnRO<T, Promise<readonly [K, V]>>): Promise<Record<K, V>>;
  }
}

function mapToObject<T, K extends PropertyKey, V>(fn: CallbackFn<T, readonly [K, V]>): Record<K, V>;
function mapToObject<T, K extends PropertyKey, V>(fn: CallbackFn<T, Promise<readonly [K, V]>>): Promise<Record<K, V>>;
function mapToObject<T, K extends PropertyKey, V>(
  this: T[],
  fn: CallbackFn<T, MaybePromise<readonly [K, V]>>,
): MaybePromise<Record<K, V>> {
  const maybePromises = this.map(fn);
  return maybePromiseAllThen(maybePromises, (r) => r.toObject());
}

Array.prototype.mapToObject = mapToObject;
