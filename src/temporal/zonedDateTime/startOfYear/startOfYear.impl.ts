import { startOfDayOpts } from "src/temporal/zonedDateTime/startOfDay/startOfDay.impl";
import { Temporal } from "temporal-polyfill";

export function startOfYearImpl(this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return this.with({ month: 1, day: 1, ...startOfDayOpts });
}

export function startOfYear(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return startOfYearImpl.call(date);
}
