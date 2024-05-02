export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    findAfter(el: T): T | undefined;
  }

  interface ReadonlyArray<T> {
    findAfter(el: T): T | undefined;
  }
}

Array.prototype.findAfter = function <T>(this: T[], el: T): T | undefined {
  const index = this.last === el ? -1 : this.indexOf(el);
  return index === -1 ? undefined : this[index + 1];
};
