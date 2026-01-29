import { findBeforeImpl } from "src/array/findBefore/findBefore.impl";

declare global {
  interface Array<T> {
    /**
     * Returns the element that comes immediately before the specified element in the array.
     * @param el The element to find the predecessor of
     * @returns The element before the specified element, or undefined if el is first, not found, or the array is empty
     * @example ["a", "b", "c"].findBefore("c") //=> "b"
     * @example ["a", "b", "c"].findBefore("a") //=> undefined
     * @example ["a", "b", "c"].findBefore("d") //=> undefined
     */
    findBefore(el: T): T | undefined;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the element that comes immediately before the specified element in the array.
     * @param el The element to find the predecessor of
     * @returns The element before the specified element, or undefined if el is first, not found, or the array is empty
     * @example ["a", "b", "c"].findBefore("c") //=> "b"
     * @example ["a", "b", "c"].findBefore("a") //=> undefined
     * @example ["a", "b", "c"].findBefore("d") //=> undefined
     */
    findBefore(el: T): T | undefined;
  }
}

Array.prototype.findBefore = findBeforeImpl;
