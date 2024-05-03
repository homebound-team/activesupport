import { Temporal } from "temporal-polyfill";
import { Comparable, KeysOfType } from "../utils";

declare global {
  interface Array<T> {
    unique(): T[];
    uniqueByKey(key: keyof T): T[];
    uniqueBy(f: (el: T, index: number, array: T[]) => unknown): T[];
  }

  interface ReadonlyArray<T> {
    unique(): T[];
    uniqueByKey(key: keyof T): T[];
    uniqueBy(f: (el: T, index: number, array: readonly T[]) => unknown): T[];
  }
}

Array.prototype.unique = function () {
  return [...new Set(this)];
};

/** Would be cool to allow an array of keys to make the criteria of "unique" more flexible */
Array.prototype.uniqueBy = function <T>(f: (el: T, index: number, array: T[]) => unknown): T[] {
  const result: T[] = [];
  const set = new Set();
  for (let i = 0; i < this.length; i++) {
    let key = f(this[i], i, this);
    if (key instanceof Date) {
      key = key.getTime();
    } else if (key instanceof Temporal.ZonedDateTime) {
      key = key.epochMilliseconds;
    } else if (key instanceof Temporal.PlainDate) {
      key = key.toString();
    } else if (typeof key === "bigint") {
      key = `${key}`;
    }
    if (!set.has(key)) {
      result.push(this[i]);
      set.add(key);
    }
  }
  return result;
};

Array.prototype.uniqueByKey = function <T>(key: KeysOfType<T, Comparable>): T[] {
  return this.uniqueBy((el) => el[key]);
};
