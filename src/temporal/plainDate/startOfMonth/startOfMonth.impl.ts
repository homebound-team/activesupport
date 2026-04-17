import { Temporal } from "temporal-polyfill";

/**
 * Returns the start of a month for a PlainDate.
 * @param date - The PlainDate to get the start of month for
 * @returns The start of a month
 * @example
 * startOfMonth(Temporal.PlainDate.from("2014-09-02"))
 * //=> 2014-09-01
 */
export function startOfMonth(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.with({ day: 1 });
}
