import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";
import { Temporal } from "temporal-polyfill";

export function uniqueBy<T>(arr: T[], fn: CallbackFn<T, unknown>): T[];
export function uniqueBy<T>(arr: readonly T[], fn: CallbackFnRO<T, unknown>): T[];
export function uniqueBy<T>(arr: readonly T[], fn: CallbackFnEither<T, unknown>): T[] {
  if (arr.length === 0) return [];
  // We know our result can't be longer than the input, so we can preallocate the result array.  This way, we do
  // not need to use push later and can avoid repeatedly resizing the result array
  const result: T[] = new Array(arr.length) as T[];
  let index = 0;
  const set = new Set();
  for (let i = 0; i < arr.length; i++) {
    let value = fn(arr[i], i, arr as T[]);
    // Since we are transforming date/temporal values into strings, we need to ensure that we don't have collisions with
    // actual strings with those values (or between Date/ZonedDateTime).  So use strings for all these types and add a
    // prefix to distinguish each type uniquely.
    if (typeof value === "string") {
      value = `string:${value}`;
    } else if (value instanceof Date) {
      value = `Date:${value.getTime()}`;
    } else if (value instanceof Temporal.ZonedDateTime) {
      value = `ZDT:${value.epochMilliseconds}`;
    } else if (value instanceof Temporal.PlainDate) {
      value = `PD:${value.toString()}`;
    }
    if (!set.has(value)) {
      result[index] = arr[i];
      index++;
      set.add(value);
    }
  }
  // The actual result length will only be the number of values we've added to the result array, so truncate to that
  // length
  result.length = index;
  return result;
}
