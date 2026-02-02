import { BusinessDayOptions, DayOfWeek, assertValidBusinessDays } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

/**
 * @name isWeekend
 * @category Weekday Helpers
 * @summary Does a given date fall on a weekend?
 *
 * @description
 * Does a given date fall on a weekend?
 *
 * @param date - The date to check
 * @param options - An object with options
 * @returns The date falls on a weekend
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * isWeekend(Temporal.PlainDate.from("2014-10-05"))
 * //=> true
 *
 * @example
 * // Does 5 October 2014 fall on a weekend with inverted weekdays?
 * isWeekend(Temporal.PlainDate.from("2014-10-05"), { businessDays: [6,7] })
 * //=> false
 */
export function isWeekend(date: Temporal.PlainDate, options: BusinessDayOptions = {}): boolean {
  assertValidBusinessDays(options);
  return !options.businessDays.includes(date.dayOfWeek as DayOfWeek);
}
