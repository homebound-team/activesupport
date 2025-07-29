import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    indexBy<O, Y = T>(fn: CallbackFn<T, O[]>, valueFn?: CallbackFn<T, Y>): Map<O, Y[]>;
  }

  interface ReadonlyArray<T> {
    indexBy<O, Y = T>(fn: CallbackFnRO<T, O[]>, valueFn?: CallbackFnRO<T, Y>): Map<O, Y[]>;
  }
}

Array.prototype.indexBy = function <T, O, Y = T>(
  this: T[],
  fn: CallbackFn<T, O[]>,
  valueFn?: CallbackFn<T, Y>,
): Map<O, Y[]> {
  const result = new Map<O, Y[]>();
  this.forEach((e, i, a) => {
    for (const key of fn(e, i, a).unique()) {
      let group = result.get(key);
      if (group === undefined) {
        group = [];
        result.set(key, group);
      }
      group.push(valueFn ? valueFn(e, i, a) : (e as any as Y));
    }
  });
  return result;
};
