import { allowOverwritingPrototypeExtension } from "./utils";

declare global {
  interface Object {
    mapValues<K extends string, V, R>(this: Record<K, V>, fn: (value: V, key: K) => R): Record<K, R>;
  }
}

Object.defineProperty(Object.prototype, "mapValues", {
  value: function <K extends string, V, R>(this: Record<K, V>, fn: (value: V, key: K) => R): Record<K, R> {
    const result = {} as Record<K, R>;
    for (const key of Object.keys(this)) {
      result[key] = fn(this[key], key as K);
    }
    return result;
  },
  ...allowOverwritingPrototypeExtension,
});
