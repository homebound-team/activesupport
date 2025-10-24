import { allowOverwritingPrototypeExtension } from "./utils";

declare global {
  interface Object {
    /**
     * Returns an array of the object's own enumerable property values.
     * This is a convenience method that wraps Object.values() to enable method chaining.
     * @returns An array of the object's values
     * @example ({foo: "a", bar: 5}).toValues() //=> ["a", 5]
     * @example ({}).toValues() //=> []
     */
    toValues<T>(this: { [s: string]: T } | ArrayLike<T>): T[];
  }
}

Object.defineProperty(Object.prototype, "toValues", {
  value: function <T>(this: { [s: string]: T } | ArrayLike<T>): T[] {
    return Object.values(this);
  },
  ...allowOverwritingPrototypeExtension,
});
