import { uniqueBy } from "src/array/uniqueBy/uniqueBy.impl";

export function unique<T>(arr: readonly T[]): T[] {
  // Use uniqueBy so we get unique Date/Temporal values
  return uniqueBy(arr, fn);
}

// Defined separately to avoid creating a closure for every runtime call
function fn<T>(value: T): T {
  return value;
}
