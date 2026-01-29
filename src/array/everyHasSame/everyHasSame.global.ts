import { CallbackFn, CallbackFnRO } from "src/array/utils";
import { everyHasSameImpl } from "./everyHasSame.impl";

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

Array.prototype.everyHasSame = everyHasSameImpl;
