import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Compares every element in the array to each other and returns true if they all match `fn(el)` and
     * false otherwise. Shorthand for `array.every((el, _, [first]) => el.some === first.some)`
     */
    everyHasSame(fn: CallbackFn<T, unknown>): boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Compares every element in the array to each other and returns true if they all match `fn(el)` and
     * false otherwise. Shorthand for `array.every((el, _, [first]) => el.some === first.some)`
     */
    everyHasSame(fn: CallbackFnRO<T, unknown>): boolean;
  }
}

Array.prototype.everyHasSame = function <T>(this: T[], fn: CallbackFn<T, unknown>): boolean {
  if (this.isEmpty) return true;
  const [e, ...rest] = this;
  const first = fn(e, 0, this);
  return rest.every((e, i) => fn(e, i + 1, this) === first);
};
