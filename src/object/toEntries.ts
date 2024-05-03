import { allowOverwritingPrototypeExtension } from "./index";

declare global {
  interface Object {
    toEntries<T, K extends string>(this: Record<K, T>): [K, T][];
    toEntries<T>(this: { [s: string]: T } | ArrayLike<T>): [string, T][];
  }
}

Object.defineProperty(Object.prototype, "toEntries", {
  value: function <T>(this: { [s: string]: T } | ArrayLike<T>): [string, T][] {
    return Object.entries(this);
  },
  ...allowOverwritingPrototypeExtension,
});
