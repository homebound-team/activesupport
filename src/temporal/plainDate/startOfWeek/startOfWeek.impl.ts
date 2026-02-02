import { WeekOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for a given date.
 *
 * @description
 * Return the start of a week for a given date.
 *
 * @param date - The date to get the start of week for
 * @param options - An object with options
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014:
 * startOfWeek(Temporal.PlainDate.from("2014-09-02"))
 * //=> 2014-08-31
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014:
 * startOfWeek(Temporal.PlainDate.from("2014-09-02"), { weekStartsOn: 1 })
 * //=> 2014-09-01
 */
export function startOfWeek(date: Temporal.PlainDate, options: WeekOptions = {}): Temporal.PlainDate {
  const { dayOfWeek, daysInWeek } = date;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? daysInWeek : 0) + dayOfWeek - weekStartsOn;
  return date.subtract({ days });
}
