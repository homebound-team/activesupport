import { allowOverwritingPrototypeExtension } from "./utils";

declare global {
  interface Object {
    /**
     * Returns an array of the object's own enumerable string-keyed property names.
     * This is a convenience method that wraps Object.keys() to enable method chaining.
     * @returns An array of the object's keys
     * @example ({foo: "a", bar: 5}).toKeys() //=> ["foo", "bar"]
     * @example ({}).toKeys() //=> []
     */
    toKeys(): string[];
  }
}

Object.defineProperty(Object.prototype, "toKeys", {
  value: function <T>(): string[] {
    return Object.keys(this);
  },
  ...allowOverwritingPrototypeExtension,
});
