import { CallbackFn } from "src/array/utils";

export function groupByImpl<K extends PropertyKey, T, Y = T>(
  this: T[],
  fn: CallbackFn<T, K>,
  valueFn?: CallbackFn<T, Y>,
): Record<K, Y[]> {
  const result = {} as Record<K, Y[]>;
  this.forEach((e, i, a) => {
    const group = fn(e, i, a);
    result[group] ??= [];
    result[group].push(valueFn ? valueFn(e, i, a) : (e as any as Y));
  });
  return result;
}

export function groupBy<K extends PropertyKey, T, Y = T>(
  arr: T[],
  fn: CallbackFn<T, K>,
  valueFn?: CallbackFn<T, Y>,
): Record<K, Y[]> {
  return groupByImpl.call<T[], [CallbackFn<T, K>, CallbackFn<T, Y> | undefined], Record<K, Y[]>>(arr, fn, valueFn);
}
