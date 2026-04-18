import { uniqueBy } from "src/array/uniqueBy/uniqueBy.impl";

/**
 * Returns a new array with duplicate elements removed.
 * @param arr - The array to remove duplicates from
 * @returns A new array containing only unique elements
 * @example
 * unique([1, 2, 2, 3, 3, 3])
 * //=> [1, 2, 3]
 * @example
 * unique([])
 * //=> []
 */
export function unique<T>(arr: readonly T[]): T[] {
  // Use uniqueBy so we get unique Date/Temporal values
  return uniqueBy(arr, fn);
}

// Defined separately to avoid creating a closure for every runtime call
function fn<T>(value: T): T {
  return value;
}
