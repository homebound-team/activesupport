export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    toObject<K extends PropertyKey, V extends any>(this: [K, V][]): Record<K, V>;
    toObject<K extends PropertyKey, V extends any>(this: (readonly [K, V])[]): Record<K, V>;
  }

  interface ReadonlyArray<T> {
    toObject<K extends PropertyKey, V extends any>(this: readonly [K, V][]): Record<K, V>;
    toObject<K extends PropertyKey, V extends any>(this: readonly (readonly [K, V])[]): Record<K, V>;
  }
}

Array.prototype.toObject = function <K extends PropertyKey, V extends any>(this: [K, V][]): Record<K, V> {
  return Object.fromEntries(this) as any;
};
