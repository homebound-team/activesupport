import { endOfDayOpts } from "src/temporal/zonedDateTime/endOfDay/endOfDay.impl";
import { Temporal } from "temporal-polyfill";

/**
 * Returns the end of a month for a ZonedDateTime.
 * @param date - The date to get the end of month for
 * @returns The end of a month
 * @example
 * endOfMonth(Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]"))
 * //=> 2014-09-30T23:59:59.999+00:00[UTC]
 */
export function endOfMonth(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with({ day: date.daysInMonth, ...endOfDayOpts });
}
