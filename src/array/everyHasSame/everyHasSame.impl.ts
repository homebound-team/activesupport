import { CallbackFn } from "src/array/utils";

export function everyHasSameImpl<T>(this: T[], fn: CallbackFn<T, unknown>): boolean {
  if (this.length === 0) return true;
  const [e, ...rest] = this;
  const first = fn(e, 0, this);
  return rest.every((e, i) => fn(e, i + 1, this) === first);
}

export function everyHasSame<T>(arr: T[], fn: CallbackFn<T, unknown>): boolean {
  return everyHasSameImpl.call<T[], [CallbackFn<T, unknown>], boolean>(arr, fn);
}
