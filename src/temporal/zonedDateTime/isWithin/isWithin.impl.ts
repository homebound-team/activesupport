import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

/**
 * Returns true if a ZonedDateTime is within the interval. (Including start and end.)
 * @param date - The ZonedDateTime to check
 * @param interval - The interval to check against
 * @returns True if the ZonedDateTime is within the interval
 * @example
 * isWithin(
 *   Temporal.ZonedDateTime.from("2014-01-03T00:00:00[UTC]"),
 *   Interval.from(Temporal.ZonedDateTime.from("2014-01-01T00:00:00[UTC]"), Temporal.ZonedDateTime.from("2014-01-07T00:00:00[UTC]"))
 * )
 * //=> true
 * @example
 * isWithin(
 *   Temporal.ZonedDateTime.from("2014-01-10T00:00:00[UTC]"),
 *   Interval.from(Temporal.ZonedDateTime.from("2014-01-01T00:00:00[UTC]"), Temporal.ZonedDateTime.from("2014-01-07T00:00:00[UTC]"))
 * )
 * //=> false
 */
export function isWithin(date: Temporal.ZonedDateTime, interval: Interval<Temporal.ZonedDateTime>): boolean {
  return interval.contains(date);
}
