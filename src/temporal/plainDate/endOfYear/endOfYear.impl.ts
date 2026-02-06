import { Temporal } from "temporal-polyfill";

/**
 * Returns the end of a year for a given date.
 * @param date - The date to get the end of year for
 * @returns The end of a year
 * @example
 * endOfYear(Temporal.PlainDate.from("2014-09-02"))
 * //=> 2014-12-31
 */
export function endOfYear(date: Temporal.PlainDate): Temporal.PlainDate {
  const month = date.monthsInYear;
  const monthYear = Temporal.PlainYearMonth.from({ year: date.year, month });
  return date.with({ month, day: monthYear.daysInMonth });
}
