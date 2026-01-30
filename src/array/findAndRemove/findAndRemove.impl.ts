import { CallbackFn } from "src/array/utils";

export function findAndRemoveImpl<T>(this: T[], fn: CallbackFn<T, boolean>): T | undefined {
  const index = this.findIndex(fn);
  if (index === -1) return undefined;
  const value = this[index];
  this.splice(index, 1);
  return value;
}

export function findAndRemove<T>(arr: T[], fn: CallbackFn<T, boolean>): T | undefined {
  return findAndRemoveImpl.call<T[], [CallbackFn<T, boolean>], T | undefined>(arr, fn);
}
