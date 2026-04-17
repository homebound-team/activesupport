import { startOfDayOpts } from "src/temporal/zonedDateTime/startOfDay/startOfDay.impl";
import { Temporal } from "temporal-polyfill";

/**
 * Returns the start of a year for a ZonedDateTime.
 * @param date - The date to get the start of year for
 * @returns The start of a year
 * @example
 * startOfYear(Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]"))
 * //=> 2014-01-01T00:00:00+00:00[UTC]
 */
export function startOfYear(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with({ month: 1, day: 1, ...startOfDayOpts });
}
