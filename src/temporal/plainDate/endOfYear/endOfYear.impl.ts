import { Temporal } from "temporal-polyfill";

export function endOfYearImpl(this: Temporal.PlainDate): Temporal.PlainDate {
  const month = this.monthsInYear;
  const monthYear = Temporal.PlainYearMonth.from({ year: this.year, month });
  return this.with({ month, day: monthYear.daysInMonth });
}

export function endOfYear(date: Temporal.PlainDate): Temporal.PlainDate {
  return endOfYearImpl.call(date);
}
