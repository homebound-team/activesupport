export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Returns the element that comes immediately after the specified element in the array.
     * @param el The element to find the successor of
     * @returns The element after the specified element, or undefined if el is last, not found, or the array is empty
     * @example ["a", "b", "c"].findAfter("a") //=> "b"
     * @example ["a", "b", "c"].findAfter("c") //=> undefined
     * @example ["a", "b", "c"].findAfter("d") //=> undefined
     */
    findAfter(el: T): T | undefined;
  }

  interface ReadonlyArray<T> {
    /**
     * Returns the element that comes immediately after the specified element in the array.
     * @param el The element to find the successor of
     * @returns The element after the specified element, or undefined if el is last, not found, or the array is empty
     * @example ["a", "b", "c"].findAfter("a") //=> "b"
     * @example ["a", "b", "c"].findAfter("c") //=> undefined
     * @example ["a", "b", "c"].findAfter("d") //=> undefined
     */
    findAfter(el: T): T | undefined;
  }
}

Array.prototype.findAfter = function <T>(this: T[], el: T): T | undefined {
  const index = this.last === el ? -1 : this.indexOf(el);
  return index === -1 ? undefined : this[index + 1];
};
