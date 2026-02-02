import { Temporal } from "temporal-polyfill";

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for a given date.
 *
 * @description
 * Return the start of a month for a given date.
 *
 * @param date - The date to get the start of month for
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014
 * startOfMonth(Temporal.PlainDate.from("2014-09-02"))
 * //=> 2014-09-01
 */
export function startOfMonth(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.with({ day: 1 });
}
