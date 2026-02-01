import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export function keyByObject<O, T, R = T>(arr: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, R>): Map<O, R>;
export function keyByObject<O, T, R = T>(
  arr: readonly T[],
  fn: CallbackFnRO<T, O>,
  valueFn?: CallbackFnRO<T, R>,
): Map<O, R>;
export function keyByObject<O, T, R = T>(
  arr: readonly T[],
  fn: CallbackFnEither<T, O>,
  valueFn?: CallbackFnEither<T, R>,
): Map<O, R> {
  const result = new Map<O, R>();
  arr.forEach((e, i, a) => {
    const group = fn(e, i, a as T[]);
    const value = valueFn ? valueFn(e, i, a as T[]) : (e as any as R);
    if (result.has(group)) {
      if (result.get(group) !== value) throw new Error(`${String(group)} already had a value assigned`);
    } else {
      result.set(group, value);
    }
  });
  return result;
}
