import { CallbackFn } from "src/array/utils";

export function indexByImpl<T, O, Y = T>(this: T[], fn: CallbackFn<T, O[]>, valueFn?: CallbackFn<T, Y>): Map<O, Y[]> {
  const result = new Map<O, Y[]>();
  this.forEach((e, i, a) => {
    const keys = new Set(fn(e, i, a));
    for (const key of keys) {
      let group = result.get(key);
      if (group === undefined) {
        group = [];
        result.set(key, group);
      }
      group.push(valueFn ? valueFn(e, i, a) : (e as any as Y));
    }
  });
  return result;
}

export function indexBy<T, O, Y = T>(arr: T[], fn: CallbackFn<T, O[]>, valueFn?: CallbackFn<T, Y>): Map<O, Y[]> {
  return indexByImpl.call<T[], [CallbackFn<T, O[]>, CallbackFn<T, Y> | undefined], Map<O, Y[]>>(arr, fn, valueFn);
}
