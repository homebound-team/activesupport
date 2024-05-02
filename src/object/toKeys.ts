import { allowOverwritingPrototypeExtension } from "./index";

declare global {
  interface Object {
    toKeys(): string[];
  }
}

Object.defineProperty(Object.prototype, "toKeys", {
  value: function <T>(): string[] {
    return Object.keys(this);
  },
  ...allowOverwritingPrototypeExtension,
});
