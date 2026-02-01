import { startOfDayOpts } from "src/temporal/zonedDateTime/startOfDay/startOfDay.impl";
import { Temporal } from "temporal-polyfill";

export function startOfYear(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with({ month: 1, day: 1, ...startOfDayOpts });
}
