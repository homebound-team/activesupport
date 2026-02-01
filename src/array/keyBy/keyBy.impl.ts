import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export function keyBy<T, K extends keyof T, TK extends T[K] extends PropertyKey ? T[K] : never>(
  arr: readonly T[],
  field: TK,
): Record<TK, T>;

export function keyBy<T, K extends PropertyKey, TK extends keyof T, R = T>(
  arr: T[],
  fn: CallbackFn<T, K>,
  valueFn?: CallbackFn<T, R>,
): Record<K, R>;
export function keyBy<T, K extends PropertyKey, TK extends keyof T, R = T>(
  arr: readonly T[],
  fn: CallbackFnRO<T, K>,
  valueFn?: CallbackFnRO<T, R>,
): Record<K, R>;
export function keyBy<T, K extends PropertyKey, TK extends keyof T, TKK extends T[TK] extends K ? TK : never, R = T>(
  arr: readonly T[],
  fnOrKey: CallbackFnEither<T, K> | TKK,
  valueFn?: CallbackFnEither<T, R>,
) {
  const result = {} as Record<K, R>;
  const fn = typeof fnOrKey === "function" ? fnOrKey : undefined;
  const key = typeof fnOrKey === "function" ? undefined : fnOrKey;
  arr.forEach((e, i, a) => {
    const group = fn ? fn(e, i, a as T[]) : (e[key as TKK] as K);
    const value = valueFn ? valueFn(e, i, a as T[]) : (e as any as R);
    if (group in result) {
      if (result[group] !== value) throw new Error(`${String(group)} already had a value assigned`);
    } else {
      result[group] = value;
    }
  });
  return result;
}
