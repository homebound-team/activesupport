import { Comparable, compare, KeysOfType } from "../utils";

declare global {
  interface Array<T> {
    /** Array is returned in ascending order. */
    sortBy<K extends Comparable>(fn: (el: T) => K | K[]): T[];
    /** Array is returned in ascending order. */
    sortByKey<K extends KeysOfType<T, Comparable>>(key: K): T[];
  }

  interface ReadonlyArray<T> {
    /** Array is returned in ascending order. */
    sortBy<K extends Comparable>(fn: (el: T) => K | K[]): T[];
    /** Array is returned in ascending order. */
    sortByKey<K extends KeysOfType<T, Comparable>>(key: K): T[];
  }
}

Array.prototype.sortBy = function <T, K extends Comparable>(this: T[], fn: (el: T) => K | K[]): T[] {
  return [...this].sort((a, b) => {
    const av = fn(a);
    const bv = fn(b);
    if (Array.isArray(av) && Array.isArray(bv)) {
      if (av.length !== bv.length) {
        throw new Error("sortBy cannot compare arrays of different lengths");
      }
      for (let i = 0; i < av.length; i++) {
        const comparison = compare(av[i], bv[i]);
        if (comparison !== 0) return comparison;
      }
      return 0;
    } else if (Array.isArray(av) || Array.isArray(bv)) {
      throw new Error("Cannot compare array to non-array");
    } else {
      return compare(av, bv);
    }
  });
};

Array.prototype.sortByKey = function <T, K extends KeysOfType<T, Comparable>>(this: T[], key: K): T[] {
  return this.sortBy((el) => el[key] as any as Comparable);
};
