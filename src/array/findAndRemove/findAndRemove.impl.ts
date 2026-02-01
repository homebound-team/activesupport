import { CallbackFn } from "src/array/utils";

export function findAndRemove<T>(arr: T[], fn: CallbackFn<T, boolean>): T | undefined {
  const index = arr.findIndex(fn);
  if (index === -1) return undefined;
  const value = arr[index];
  arr.splice(index, 1);
  return value;
}
