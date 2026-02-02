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
 *   Temporal.PlainDate.from("2014-01-03"),
 *   Interval.from(Temporal.PlainDate.from("2014-01-01"), Temporal.PlainDate.from("2014-01-07"))
 * )
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithin(
 *   Temporal.PlainDate.from("2014-01-10"),
 *   Interval.from(Temporal.PlainDate.from("2014-01-01"), Temporal.PlainDate.from("2014-01-07"))
 * )
 * //=> false
 */
export function isWithin(date: Temporal.PlainDate, interval: Interval<Temporal.PlainDate>): boolean {
  return interval.contains(date);
}
