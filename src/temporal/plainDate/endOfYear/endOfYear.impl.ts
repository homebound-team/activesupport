import { Temporal } from "temporal-polyfill";

export function endOfYear(date: Temporal.PlainDate): Temporal.PlainDate {
  const month = date.monthsInYear;
  const monthYear = Temporal.PlainYearMonth.from({ year: date.year, month });
  return date.with({ month, day: monthYear.daysInMonth });
}
