import { CallbackFnRO } from "src/array/utils";
import { MaybePromise, maybePromiseAllThen } from "src/utils";

export function mapToObjectImpl<T, K extends PropertyKey, V>(
  this: readonly T[],
  fn: CallbackFnRO<T, MaybePromise<readonly [K, V]>>,
): MaybePromise<Record<K, V>> {
  const maybePromises = this.map(fn);
  return maybePromiseAllThen(maybePromises, Object.fromEntries);
}

export function mapToObject<T, K extends PropertyKey, V>(
  arr: readonly T[],
  fn: CallbackFnRO<T, readonly [K, V]>,
): Record<K, V>;
export function mapToObject<T, K extends PropertyKey, V>(
  arr: readonly T[],
  fn: CallbackFnRO<T, Promise<readonly [K, V]>>,
): Promise<Record<K, V>>;
export function mapToObject<T, K extends PropertyKey, V>(
  arr: readonly T[],
  fn: CallbackFnRO<T, MaybePromise<readonly [K, V]>>,
): MaybePromise<Record<K, V>> {
  return mapToObjectImpl.call<
    readonly T[],
    [CallbackFnRO<T, MaybePromise<readonly [K, V]>>],
    MaybePromise<Record<K, V>>
  >(arr, fn);
}
