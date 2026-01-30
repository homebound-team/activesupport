import { startOfDayOpts } from "src/temporal/zonedDateTime/startOfDay/startOfDay.impl";
import { Temporal } from "temporal-polyfill";

export function startOfMonthImpl(this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return this.with({ day: 1, ...startOfDayOpts });
}

export function startOfMonth(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return startOfMonthImpl.call(date);
}
