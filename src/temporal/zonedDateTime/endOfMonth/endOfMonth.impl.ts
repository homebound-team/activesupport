import { endOfDayOpts } from "src/temporal/zonedDateTime/endOfDay/endOfDay.impl";
import { Temporal } from "temporal-polyfill";

export function endOfMonthImpl(this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return this.with({ day: this.daysInMonth, ...endOfDayOpts });
}

export function endOfMonth(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return endOfMonthImpl.call(date);
}
