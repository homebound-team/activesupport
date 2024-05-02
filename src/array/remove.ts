export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    remove(element: T): void;
  }
}

Array.prototype.remove = function (element) {
  const index = this.indexOf(element);
  if (index > -1) {
    this.splice(index, 1);
  }
};
