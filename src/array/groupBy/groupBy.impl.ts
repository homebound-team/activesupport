import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export function groupBy<T, K extends PropertyKey>(arr: T[], fn: CallbackFn<T, K>): Record<K, T[]>;
export function groupBy<K extends PropertyKey, T, R>(
  arr: T[],
  fn: CallbackFn<T, K>,
  valueFn: CallbackFn<T, R>,
): Record<K, R[]>;
export function groupBy<T, K extends PropertyKey>(arr: readonly T[], fn: CallbackFnRO<T, K>): Record<K, T[]>;
export function groupBy<K extends PropertyKey, T, R>(
  arr: readonly T[],
  fn: CallbackFnRO<T, K>,
  valueFn: CallbackFnRO<T, R>,
): Record<K, R[]>;
export function groupBy<K extends PropertyKey, T, Y = T>(
  arr: readonly T[],
  fn: CallbackFnEither<T, K>,
  valueFn?: CallbackFnEither<T, Y>,
): Record<K, Y[]> {
  const result = {} as Record<K, Y[]>;
  arr.forEach((e, i, a) => {
    const group = fn(e, i, a as T[]);
    result[group] ??= [];
    result[group].push(valueFn ? valueFn(e, i, a as T[]) : (e as any as Y));
  });
  return result;
}
