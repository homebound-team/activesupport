import { Temporal } from "temporal-polyfill";

export function uniqueByImpl<T>(this: T[], f: (el: T, index: number, array: T[]) => unknown): T[] {
  // We know our result can't be longer than the input, so we can preallocate the result array and not need to use
  // push later to avoid potentially resizing the array.
  const result: T[] = new Array(this.length) as T[];
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
      result[i] = this[i];
      set.add(key);
    }
  }
  // The actual result length will be the number of elements in the set.  So we slice the array to that length so we
  // don't end up with extra undefined elements that we created at the start.
  return result.slice(0, set.size);
}

export function uniqueBy<T>(arr: T[], f: (el: T, index: number, array: T[]) => unknown): T[] {
  return uniqueByImpl.call<T[], [(el: T, index: number, array: T[]) => unknown], T[]>(arr, f);
}
