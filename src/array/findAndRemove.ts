import { CallbackFn } from "./index";

declare global {
  interface Array<T> {
    findAndRemove: (fn: CallbackFn<T, boolean>) => T | undefined;
  }
}

Array.prototype.findAndRemove = function <T>(this: T[], fn: CallbackFn<T, boolean>): T | undefined {
  const val = this.find(fn);
  if (!val) return undefined;
  this.remove(val);
  return val;
};
