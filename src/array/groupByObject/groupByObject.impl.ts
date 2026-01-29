import { CallbackFn } from "src/array/utils";

export function groupByObjectImpl<T, O, Y = T>(
  this: T[],
  fn: CallbackFn<T, O>,
  valueFn?: CallbackFn<T, Y>,
): [O, Y[]][] {
  const result = new Map<O, Y[]>();
  this.forEach((e, i, a) => {
    const key = fn(e, i, a);
    let group = result.get(key);
    if (group === undefined) {
      group = [];
      result.set(key, group);
    }
    group.push(valueFn ? valueFn(e, i, a) : (e as any as Y));
  });
  return [...result.entries()];
}

export function groupByObject<T, O, Y = T>(arr: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>): [O, Y[]][] {
  return groupByObjectImpl.call<T[], [CallbackFn<T, O>, CallbackFn<T, Y> | undefined], [O, Y[]][]>(arr, fn, valueFn);
}
