import { Temporal } from "temporal-polyfill";

/**
 * Returns the start of a year for a given date.
 * @param date - The date to get the start of year for
 * @returns The start of a year
 * @example
 * startOfYear(Temporal.PlainDate.from("2014-09-02"))
 * //=> 2014-01-01
 */
export function startOfYear(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.with({ month: 1, day: 1 });
}
