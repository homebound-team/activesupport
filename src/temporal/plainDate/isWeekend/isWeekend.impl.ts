import { BusinessDayOptions, DayOfWeek, assertValidBusinessDays } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

/**
 * @name isWeekend
 * @category Weekday Helpers
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend?
 *
 * @param options - An object with options
 *
 * @returns The date falls on a weekend
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * const result = Temporal.PlainDate.from("2014-10-05").isWeekend()
 * //=> true
 *
 * @example
 * // Does 5 October 2014 fall on a weekend with inverted weekdays?
 * const result = Temporal.PlainDate.from("2014-10-05").isWeekend({ businessDays: [6,7] })
 * //=> false
 */
export function isWeekend(date: Temporal.PlainDate, options: BusinessDayOptions = {}): boolean {
  assertValidBusinessDays(options);
  return !options.businessDays.includes(date.dayOfWeek as DayOfWeek);
}
