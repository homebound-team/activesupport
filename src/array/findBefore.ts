export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    findBefore(el: T): T | undefined;
  }

  interface ReadonlyArray<T> {
    findBefore(el: T): T | undefined;
  }
}

Array.prototype.findBefore = function <T>(this: T[], el: T): T | undefined {
  const index = this.first === el ? -1 : this.indexOf(el);
  return index === -1 ? undefined : this[index - 1];
};
