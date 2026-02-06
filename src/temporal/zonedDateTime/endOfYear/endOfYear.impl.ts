import { endOfDayOpts } from "src/temporal/zonedDateTime/endOfDay/endOfDay.impl";
import { Temporal } from "temporal-polyfill";

/**
 * Returns the end of a year for a given date.
 * @param date - The date to get the end of year for
 * @returns The end of a year
 * @example
 * endOfYear(Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]"))
 * //=> 2014-12-31T23:59:59.999+00:00[UTC]
 */
export function endOfYear(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  const yearMonth = Temporal.PlainYearMonth.from({ year: date.year, month: date.monthsInYear });
  return date.with({ month: date.monthsInYear, day: yearMonth.daysInMonth, ...endOfDayOpts });
}
