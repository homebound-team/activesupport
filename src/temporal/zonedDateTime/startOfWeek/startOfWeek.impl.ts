import { WeekOptions } from "src/temporal/utils";
import { startOfDayOpts } from "src/temporal/zonedDateTime/startOfDay/startOfDay.impl";
import { Temporal } from "temporal-polyfill";

/**
 * Returns the start of a week for a ZonedDateTime.
 * @param date - The date to get the start of week for
 * @param options - An object with options
 * @returns The start of a week
 * @example
 * startOfWeek(Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]"))
 * //=> 2014-08-31T00:00:00+00:00[UTC]
 * @example
 * // If the week starts on Monday:
 * startOfWeek(Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]"), { weekStartsOn: 1 })
 * //=> 2014-09-01T00:00:00+00:00[UTC]
 */
export function startOfWeek(date: Temporal.ZonedDateTime, options: WeekOptions = {}): Temporal.ZonedDateTime {
  const { dayOfWeek, daysInWeek } = date;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? daysInWeek : 0) + dayOfWeek - weekStartsOn;
  return date.subtract({ days }).with(startOfDayOpts);
}
