import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { MaybePromise, maybePromiseAllThen } from "src/utils";

export function mapToObject<T, K extends PropertyKey, V>(arr: T[], fn: CallbackFn<T, readonly [K, V]>): Record<K, V>;
export function mapToObject<T, K extends PropertyKey, V>(
  arr: T[],
  fn: CallbackFn<T, Promise<readonly [K, V]>>,
): Promise<Record<K, V>>;
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
  fn: CallbackFnEither<T, MaybePromise<readonly [K, V]>>,
): MaybePromise<Record<K, V>> {
  const maybePromises = (arr as T[]).map(fn);
  return maybePromiseAllThen(maybePromises, Object.fromEntries);
}
