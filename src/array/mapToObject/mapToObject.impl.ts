import { CallbackFn } from "src/array/utils";
import { MaybePromise, maybePromiseAllThen } from "src/utils";

export function mapToObjectImpl<T, K extends PropertyKey, V>(
  this: T[],
  fn: CallbackFn<T, MaybePromise<readonly [K, V]>>,
): MaybePromise<Record<K, V>> {
  const maybePromises = this.map(fn);
  return maybePromiseAllThen(maybePromises, Object.fromEntries);
}

export function mapToObject<T, K extends PropertyKey, V>(arr: T[], fn: CallbackFn<T, readonly [K, V]>): Record<K, V>;
export function mapToObject<T, K extends PropertyKey, V>(
  arr: T[],
  fn: CallbackFn<T, Promise<readonly [K, V]>>,
): Promise<Record<K, V>>;
export function mapToObject<T, K extends PropertyKey, V>(
  arr: T[],
  fn: CallbackFn<T, MaybePromise<readonly [K, V]>>,
): MaybePromise<Record<K, V>> {
  return mapToObjectImpl.call<T[], [CallbackFn<T, MaybePromise<readonly [K, V]>>], MaybePromise<Record<K, V>>>(arr, fn);
}
