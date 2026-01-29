import { Comparable, compare } from "src/utils";

export function sortByImpl<T, K extends Comparable>(this: T[], fn: (el: T) => K | K[]): T[] {
  return this.sort((a, b) => {
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
}

export function sortBy<T, U extends Comparable>(arr: T[], fn: (el: T) => U | U[]): T[] {
  return sortByImpl.call<T[], [(el: T) => U | U[]], T[]>(arr, fn);
}
