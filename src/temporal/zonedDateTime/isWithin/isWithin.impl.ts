import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

/**
 * @name isWithin
 * @category Interval Helpers
 * @summary Is a given date within the interval?
 *
 * @description
 * Is a given date within the interval? (Including start and end.)
 *
 * @param date - The date to check
 * @param interval - The interval to check against
 * @returns The date is within the interval
 *
 * @example
 * // For the date within the interval:
 * isWithin(
 *   Temporal.ZonedDateTime.from("2014-01-03T00:00:00[UTC]"),
 *   Interval.from(Temporal.ZonedDateTime.from("2014-01-01T00:00:00[UTC]"), Temporal.ZonedDateTime.from("2014-01-07T00:00:00[UTC]"))
 * )
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithin(
 *   Temporal.ZonedDateTime.from("2014-01-10T00:00:00[UTC]"),
 *   Interval.from(Temporal.ZonedDateTime.from("2014-01-01T00:00:00[UTC]"), Temporal.ZonedDateTime.from("2014-01-07T00:00:00[UTC]"))
 * )
 * //=> false
 */
export function isWithin(date: Temporal.ZonedDateTime, interval: Interval<Temporal.ZonedDateTime>): boolean {
  return interval.contains(date);
}
