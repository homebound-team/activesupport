export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    batched(n: number): T[][];
  }

  interface ReadonlyArray<T> {
    batched(n: number): T[][];
  }
}

Array.prototype.batched = function <T>(this: T[], n: number): T[][] {
  const result = [] as T[][];
  for (let i = 0; i < this.length; i += n) {
    result.push(this.slice(i, i + n));
  }
  return result;
};
