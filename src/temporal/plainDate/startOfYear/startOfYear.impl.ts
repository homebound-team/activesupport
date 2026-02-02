import { Temporal } from "temporal-polyfill";

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014
 * const result = Temporal.PlainDate.from("2014-09-02").startOfYear()
 * //=> 2014-01-01
 */
export function startOfYear(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.with({ month: 1, day: 1 });
}
