import { CallbackFn } from "src/array/utils";

export function keyByImpl<
  T,
  K extends PropertyKey,
  TK extends keyof T,
  TKK extends T[TK] extends K ? TK : never,
  Y = T,
>(this: T[], fnOrKey: CallbackFn<T, K> | TKK, valueFn?: CallbackFn<T, Y>) {
  const result = {} as Record<K, Y>;
  const fn = typeof fnOrKey === "function" ? fnOrKey : undefined;
  const key = typeof fnOrKey === "function" ? undefined : fnOrKey;
  this.forEach((e, i, a) => {
    const group = fn ? fn(e, i, a) : (e[key as TKK] as K);
    const value = valueFn ? valueFn(e, i, a) : (e as any as Y);
    if (group in result) {
      if (result[group] !== value) throw new Error(`${String(group)} already had a value assigned`);
    } else {
      result[group] = value;
    }
  });
  return result;
}

export function keyBy<T, K extends PropertyKey, TK extends keyof T, TKK extends T[TK] extends K ? TK : never, Y = T>(
  arr: T[],
  fnOrKey: CallbackFn<T, K> | TKK,
  valueFn?: CallbackFn<T, Y>,
) {
  return keyByImpl.call<T[], [CallbackFn<T, K> | TKK, CallbackFn<T, Y> | undefined], Record<K, Y>>(
    arr,
    fnOrKey,
    valueFn,
  );
}
