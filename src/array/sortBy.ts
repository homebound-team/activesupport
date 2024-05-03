import { Comparable, compare, KeysOfType } from "../utils";

declare global {
  interface Array<T> {
    /** Array is returned in ascending order. */
    sortBy<K extends Comparable>(fn: (el: T) => K): T[];
    /** Array is returned in ascending order. */
    sortByKey<K extends KeysOfType<T, Comparable>>(key: K): T[];
  }

  interface ReadonlyArray<T> {
    /** Array is returned in ascending order. */
    sortBy<K extends Comparable>(fn: (el: T) => K): T[];
    /** Array is returned in ascending order. */
    sortByKey<K extends KeysOfType<T, Comparable>>(key: K): T[];
  }
}

Array.prototype.sortBy = function <T, K extends Comparable>(this: T[], fn: (el: T) => K): T[] {
  return [...this].sort((a, b) => compare(fn(a), fn(b)));
};

Array.prototype.sortByKey = function <T, K extends KeysOfType<T, Comparable>>(this: T[], key: K): T[] {
  return this.sortBy((el) => el[key] as any as Comparable);
};
