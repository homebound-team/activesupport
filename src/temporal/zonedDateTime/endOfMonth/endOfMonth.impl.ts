import { endOfDayOpts } from "src/temporal/zonedDateTime/endOfDay/endOfDay.impl";
import { Temporal } from "temporal-polyfill";

export function endOfMonth(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with({ day: date.daysInMonth, ...endOfDayOpts });
}
