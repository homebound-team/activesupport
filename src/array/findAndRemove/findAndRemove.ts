import { CallbackFn } from "./index";

declare global {
  interface Array<T> {
    /**
     * Finds the first element matching the predicate and removes it from the array.
     * This mutates the original array.
     * @param fn A function to test each element
     * @returns The removed element, or undefined if no element matches
     * @example const arr = [1, 2, 3, 4]; arr.findAndRemove(n => n === 2) //=> 2, arr is now [1, 3, 4]
     * @example [1, 2, 3].findAndRemove(n => n === 5) //=> undefined
     */
    findAndRemove: (fn: CallbackFn<T, boolean>) => T | undefined;
  }
}

Array.prototype.findAndRemove = function <T>(this: T[], fn: CallbackFn<T, boolean>): T | undefined {
  const val = this.find(fn);
  if (!val) return undefined;
  this.remove(val);
  return val;
};
