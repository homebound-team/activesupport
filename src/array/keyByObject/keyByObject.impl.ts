import { CallbackFn } from "src/array/utils";

export function keyByObjectImpl<O, T, Y = T>(this: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>) {
  const result = new Map<O, Y>();
  this.forEach((e, i, a) => {
    const group = fn(e, i, a);
    const value = valueFn ? valueFn(e, i, a) : (e as any as Y);
    if (result.has(group)) {
      if (result.get(group) !== value) throw new Error(`${String(group)} already had a value assigned`);
    } else {
      result.set(group, value);
    }
  });
  return result;
}

export function keyByObject<O, T, Y = T>(arr: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>) {
  return keyByObjectImpl.call<T[], [CallbackFn<T, O>, CallbackFn<T, Y> | undefined], Map<O, Y>>(arr, fn, valueFn);
}
