import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Returns true if all elements produce the same value when passed through the callback.
     * @param fn A function that extracts a value to compare from each element
     * @returns True if all elements produce the same value
     * @example [{status: "done"}, {status: "done"}].everyHasSame(o => o.status) //=> true
     * @example [{status: "done"}, {status: "pending"}].everyHasSame(o => o.status) //=> false
     * @example [].everyHasSame(o => o.value) //=> true
     */
    everyHasSame(fn: CallbackFn<T, unknown>): boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns true if all elements produce the same value when passed through the callback.
     * @param fn A function that extracts a value to compare from each element
     * @returns True if all elements produce the same value
     * @example [{status: "done"}, {status: "done"}].everyHasSame(o => o.status) //=> true
     * @example [{status: "done"}, {status: "pending"}].everyHasSame(o => o.status) //=> false
     * @example [].everyHasSame(o => o.value) //=> true
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
