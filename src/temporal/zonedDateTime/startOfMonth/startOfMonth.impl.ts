import { startOfDayOpts } from "src/temporal/zonedDateTime/startOfDay/startOfDay.impl";
import { Temporal } from "temporal-polyfill";

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for a given date.
 *
 * @description
 * Return the start of a month for a given date.
 *
 * @param date - The date to get the start of month for
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014
 * startOfMonth(Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]"))
 * //=> 2014-09-01T00:00:00+00:00[UTC]
 */
export function startOfMonth(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with({ day: 1, ...startOfDayOpts });
}
