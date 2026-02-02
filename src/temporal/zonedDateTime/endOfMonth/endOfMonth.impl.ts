import { endOfDayOpts } from "src/temporal/zonedDateTime/endOfDay/endOfDay.impl";
import { Temporal } from "temporal-polyfill";

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014
 * const result = Temporal.ZonedDateTime.from("2014-09-02").endOfMonth()
 * //=> "2014-09-30"
 */
export function endOfMonth(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with({ day: date.daysInMonth, ...endOfDayOpts });
}
