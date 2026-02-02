import { WeekOptions } from "src/temporal/utils";
import { startOfDayOpts } from "src/temporal/zonedDateTime/startOfDay/startOfDay.impl";
import { Temporal } from "temporal-polyfill";

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 *
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014:
 * const result = Temporal.ZonedDateTime.from("2014-09-02").startOfWeek()
 * //=> 2014-08-31
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014:
 * const result = Temporal.ZonedDateTime.from("2014-09-02").startOfWeek({ weekStartsOn: 1 })
 * //=> 2014-09-01
 */
export function startOfWeek(date: Temporal.ZonedDateTime, options: WeekOptions = {}): Temporal.ZonedDateTime {
  const { dayOfWeek, daysInWeek } = date;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? daysInWeek : 0) + dayOfWeek - weekStartsOn;
  return date.subtract({ days }).with(startOfDayOpts);
}
