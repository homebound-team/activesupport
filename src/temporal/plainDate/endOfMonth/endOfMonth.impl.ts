import { Temporal } from "temporal-polyfill";

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for a date.
 *
 * @description
 * Return the end of a month for a date.
 *
 * @param date - the date to get the end of month for
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014
 * endOfMonth(Temporal.PlainDate.from("2014-09-02"))
 * //=> "2014-09-30"
 */
export function endOfMonth(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.with({ day: date.daysInMonth });
}
