import { WeekOptions } from "src/temporal/utils";
import { endOfDayOpts } from "src/temporal/zonedDateTime/endOfDay/endOfDay.impl";
import { Temporal } from "temporal-polyfill";

/**
 * Returns the end of a week for a ZonedDateTime.
 * @param date - The date to get the end of week for
 * @param options - An object with options
 * @returns The end of a week
 * @example
 * endOfWeek(Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]"))
 * //=> 2014-09-06T23:59:59.999+00:00[UTC]
 * @example
 * // If the week starts on Monday:
 * endOfWeek(Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]"), { weekStartsOn: 1 })
 * //=> 2014-09-07T23:59:59.999+00:00[UTC]
 */
export function endOfWeek(date: Temporal.ZonedDateTime, options: WeekOptions = {}): Temporal.ZonedDateTime {
  const { dayOfWeek, daysInWeek } = date;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? -daysInWeek : 0) + 6 - (dayOfWeek - weekStartsOn);
  return date.add({ days }).with(endOfDayOpts);
}
