import { Comparable, compare, fail } from "src/utils";

export function sortBy<T, U extends Comparable>(arr: readonly T[], fn: (el: T) => U | U[]): T[] {
  return arr.slice().sort((a, b) => {
    const av = fn(a);
    const bv = fn(b);
    if (Array.isArray(av) && Array.isArray(bv)) {
      if (av.length !== bv.length) fail("sortBy cannot compare arrays of different lengths");
      for (let i = 0; i < av.length; i++) {
        const comparison = compare(av[i], bv[i]);
        if (comparison !== 0) return comparison;
      }
      return 0;
    } else if (Array.isArray(av) || Array.isArray(bv)) {
      fail("sortBy cannot compare array to non-array");
    } else {
      return compare(av, bv);
    }
  });
}
