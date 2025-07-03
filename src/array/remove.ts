export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    remove(element: T): void;
    remove(...elements: readonly T[]): void;
  }
}

Array.prototype.remove = function <T>(this: T[], ...elements: readonly T[]) {
  // start from the end of the array so we don't need to worry about re-ordering
  for (let index = this.length - 1; index >= 0; index--) {
    if (elements.includes(this[index])) {
      this.splice(index, 1);
    }
  }
};
