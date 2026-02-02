import { Temporal } from "temporal-polyfill";

/**
 * @name endOfYear
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * @param date - The original date
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
export function endOfYear(date: Temporal.PlainDate): Temporal.PlainDate {
  const month = date.monthsInYear;
  const monthYear = Temporal.PlainYearMonth.from({ year: date.year, month });
  return date.with({ month, day: monthYear.daysInMonth });
}
