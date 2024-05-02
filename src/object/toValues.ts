import { allowOverwritingPrototypeExtension } from "./index";

declare global {
  interface Object {
    toValues<T>(this: { [s: string]: T } | ArrayLike<T>): T[];
  }
}

Object.defineProperty(Object.prototype, "toValues", {
  value: function <T>(this: { [s: string]: T } | ArrayLike<T>): T[] {
    return Object.values(this);
  },
  ...allowOverwritingPrototypeExtension,
});
