import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export function groupByObject<T, O, Y = T>(arr: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>): [O, Y[]][];
export function groupByObject<T, O, Y = T>(
  arr: readonly T[],
  fn: CallbackFnRO<T, O>,
  valueFn?: CallbackFnRO<T, Y>,
): [O, Y[]][];
export function groupByObject<T, O, Y = T>(
  arr: readonly T[],
  fn: CallbackFnEither<T, O>,
  valueFn?: CallbackFnEither<T, Y>,
): [O, Y[]][] {
  const result = new Map<O, Y[]>();
  arr.forEach((e, i, a) => {
    const key = fn(e, i, a as T[]);
    let group = result.get(key);
    if (group === undefined) {
      group = [];
      result.set(key, group);
    }
    group.push(valueFn ? valueFn(e, i, a as T[]) : (e as any as Y));
  });
  return [...result.entries()];
}
