import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    groupBy<K extends PropertyKey, Y = T>(fn: CallbackFn<T, K>, valueFn?: CallbackFn<T, Y>): Record<K, Y[]>;
    groupByObject<O, Y = T>(fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>): [O, Y[]][];
  }

  interface ReadonlyArray<T> {
    groupBy<K extends PropertyKey, Y = T>(fn: CallbackFnRO<T, K>, valueFn?: CallbackFnRO<T, Y>): Record<K, Y[]>;
    groupByObject<O, Y = T>(fn: CallbackFnRO<T, O>, valueFn?: CallbackFnRO<T, Y>): [O, Y[]][];
  }
}

Array.prototype.groupBy = function <K extends PropertyKey, T, Y = T>(
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
};

Array.prototype.groupByObject = function <T, O, Y = T>(
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
};
