import { endOfDayOpts } from "src/temporal/zonedDateTime/endOfDay/endOfDay.impl";
import { Temporal } from "temporal-polyfill";

/**
 * @name endOfYear
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
export function endOfYear(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  const yearMonth = Temporal.PlainYearMonth.from({ year: date.year, month: date.monthsInYear });
  return date.with({ month: date.monthsInYear, day: yearMonth.daysInMonth, ...endOfDayOpts });
}
