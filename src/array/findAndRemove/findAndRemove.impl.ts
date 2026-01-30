import { removeImpl } from "src/array/remove/remove.impl";
import { CallbackFn } from "src/array/utils";

export function findAndRemoveImpl<T>(this: T[], fn: CallbackFn<T, boolean>): T | undefined {
  const val = this.find(fn);
  if (!val) return undefined;
  removeImpl.call(this, val);
  return val;
}

export function findAndRemove<T>(arr: T[], fn: CallbackFn<T, boolean>): T | undefined {
  return findAndRemoveImpl.call<T[], [CallbackFn<T, boolean>], T | undefined>(arr, fn);
}
