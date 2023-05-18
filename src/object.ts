export {}; // needed for TS to realize this file can be imported

declare global {
  interface Object {
    toEntries<T, K extends string>(this: Record<K, T>): [K, T][];
    toEntries<T>(this: { [s: string]: T } | ArrayLike<T>): [string, T][];
    toValues<T>(this: { [s: string]: T } | ArrayLike<T>): T[];
    toKeys<T>(): string[];
  }
}

Object.defineProperty(Object.prototype, "toEntries", {
  value: function <T>(this: { [s: string]: T } | ArrayLike<T>): [string, T][] {
    return Object.entries(this);
  },
});

Object.defineProperty(Object.prototype, "toValues", {
  value: function <T>(this: { [s: string]: T } | ArrayLike<T>): T[] {
    return Object.values(this);
  },
});

Object.defineProperty(Object.prototype, "toKeys", {
  value: function <T>(): string[] {
    return Object.keys(this);
  },
});
