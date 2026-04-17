import { Temporal } from "temporal-polyfill";

/**
 * Returns the end of a month for a PlainDate.
 * @param date - The date to get the end of month for
 * @returns The end of a month
 * @example
 * endOfMonth(Temporal.PlainDate.from("2014-09-02"))
 * //=> "2014-09-30"
 */
export function endOfMonth(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.with({ day: date.daysInMonth });
}
