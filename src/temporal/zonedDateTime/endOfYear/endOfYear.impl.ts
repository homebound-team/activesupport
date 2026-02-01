import { endOfDayOpts } from "src/temporal/zonedDateTime/endOfDay/endOfDay.impl";
import { Temporal } from "temporal-polyfill";

export function endOfYear(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  const yearMonth = Temporal.PlainYearMonth.from({ year: date.year, month: date.monthsInYear });
  return date.with({ month: date.monthsInYear, day: yearMonth.daysInMonth, ...endOfDayOpts });
}
