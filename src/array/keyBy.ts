import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    keyBy<K extends keyof T>(field: T[K] extends PropertyKey ? T[K] : never): Record<PropertyKey, T>;
    keyBy<K extends PropertyKey, Y = T>(fn: CallbackFn<T, K>, valueFn?: CallbackFn<T, Y>): Record<K, Y>;
    keyByObject<O, Y = T>(this: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>): Map<O, Y>;
  }

  interface ReadonlyArray<T> {
    keyBy<K extends keyof T>(field: T[K] extends PropertyKey ? T[K] : never): Record<PropertyKey, T>;
    keyBy<K extends PropertyKey, Y = T>(fn: CallbackFnRO<T, K>, valueFn?: CallbackFnRO<T, Y>): Record<K, Y>;
    keyByObject<O, Y = T>(this: T[], fn: CallbackFnRO<T, O>, valueFn?: CallbackFnRO<T, Y>): Map<O, Y>;
  }
}

Array.prototype.keyBy = function <T, K extends PropertyKey, Y = T>(
  this: T[],
  fnOrKey: CallbackFn<T, K> | keyof T[][number],
  valueFn?: CallbackFn<T, Y>,
) {
  const result = {} as Record<K, Y>;
  const fn = typeof fnOrKey === "function" ? fnOrKey : (x: T) => x[fnOrKey] as K;
  this.forEach((e, i, a) => {
    const group = fn(e, i, a);
    if (result[group] !== undefined) {
      throw new Error(`${String(group)} already had a value assigned`);
    }
    result[group] = valueFn ? valueFn(e, i, a) : (e as any as Y);
  });
  return result;
};

Array.prototype.keyByObject = function <O, T, Y = T>(this: T[], fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>) {
  const result = new Map<O, Y>();
  this.forEach((e, i, a) => {
    const group = fn(e, i, a);
    if (result.has(group)) {
      throw new Error(`${String(group)} already had a value assigned`);
    }
    result.set(group, valueFn ? valueFn(e, i, a) : (e as any as Y));
  });
  return result;
};
