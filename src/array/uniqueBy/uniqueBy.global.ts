import { uniqueByImpl } from "src/array/uniqueBy/uniqueBy.impl";

declare global {
  interface Array<T> {
    /**
     * Returns a new array with duplicates removed based on the value returned by the callback.
     * @param f A function that returns the value to use for uniqueness comparison
     * @returns A new array containing elements with unique callback values
     * @example [{id: 1}, {id: 2}, {id: 1}].uniqueBy(o => o.id) //=> [{id: 1}, {id: 2}]
     */
    uniqueBy(f: (el: T, index: number, array: T[]) => unknown): T[];
  }

  interface ReadonlyArray<T> {
    /**
     * Returns a new array with duplicates removed based on the value returned by the callback.
     * @param f A function that returns the value to use for uniqueness comparison
     * @returns A new array containing elements with unique callback values
     * @example [{id: 1}, {id: 2}, {id: 1}].uniqueBy(o => o.id) //=> [{id: 1}, {id: 2}]
     */
    uniqueBy(f: (el: T, index: number, array: readonly T[]) => unknown): T[];
  }
}

Array.prototype.uniqueBy = uniqueByImpl;
