import { WeekOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

/**
 * Returns the end of a week for a PlainDate.
 * @param date - The date to get the end of week for
 * @param options - An object with options
 * @returns The end of a week
 * @example
 * endOfWeek(Temporal.PlainDate.from("2014-09-02"))
 * //=> 2014-09-06
 * @example
 * // If the week starts on Monday:
 * endOfWeek(Temporal.PlainDate.from("2014-09-02"), { weekStartsOn: 1 })
 * //=> 2014-09-07
 */
export function endOfWeek(date: Temporal.PlainDate, options: WeekOptions = {}): Temporal.PlainDate {
  const { dayOfWeek, daysInWeek } = date;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? -daysInWeek : 0) + 6 - (dayOfWeek - weekStartsOn);
  return date.add({ days });
}
