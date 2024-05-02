import { isDefined } from "../utils";

declare global {
  interface Array<T> {
    compact(): NonNullable<T>[];
  }

  interface ReadonlyArray<T> {
    compact(): NonNullable<T>[];
  }
}

Array.prototype.compact = function () {
  return this.filter(isDefined);
};
