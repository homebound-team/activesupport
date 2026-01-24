import { allowOverwritingPrototypeExtension } from "./utils";

declare global {
  interface Object {
    /**
     * Converts the object to an array of [key, value] tuples.
     * This is a convenience method that wraps Object.entries() to enable method chaining.
     * @returns An array of [key, value] pairs from the object
     * @example ({foo: "a", bar: 5}).toEntries() //=> [["foo", "a"], ["bar", 5]]
     * @example ({}).toEntries() //=> []
     */
    toEntries<T, K extends string>(this: Record<K, T>): [K, T][];
    /**
     * Converts the object to an array of [key, value] tuples.
     * This is a convenience method that wraps Object.entries() to enable method chaining.
     * @returns An array of [key, value] pairs from the object
     * @example ({foo: "a", bar: 5}).toEntries() //=> [["foo", "a"], ["bar", 5]]
     * @example ({}).toEntries() //=> []
     */
    toEntries<T>(this: { [s: string]: T } | ArrayLike<T>): [string, T][];
  }
}

Object.defineProperty(Object.prototype, "toEntries", {
  value: function <T>(this: { [s: string]: T } | ArrayLike<T>): [string, T][] {
    return Object.entries(this);
  },
  ...allowOverwritingPrototypeExtension,
});
