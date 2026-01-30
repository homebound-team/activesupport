import { endOfDayOpts } from "src/temporal/zonedDateTime/endOfDay/endOfDay.impl";
import { Temporal } from "temporal-polyfill";

export function endOfYearImpl(this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  const yearMonth = Temporal.PlainYearMonth.from({ year: this.year, month: this.monthsInYear });
  return this.with({ month: this.monthsInYear, day: yearMonth.daysInMonth, ...endOfDayOpts });
}

export function endOfYear(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return endOfYearImpl.call(date);
}
