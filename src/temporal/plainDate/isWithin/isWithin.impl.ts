import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

/**
 * Returns true if a PlainDate is within the interval. (Including start and end.)
 * @param date - The PlainDate to check
 * @param interval - The interval to check against
 * @returns True if the PlainDate is within the interval
 * @example
 * isWithin(
 *   Temporal.PlainDate.from("2014-01-03"),
 *   Interval.from(Temporal.PlainDate.from("2014-01-01"), Temporal.PlainDate.from("2014-01-07"))
 * )
 * //=> true
 * @example
 * isWithin(
 *   Temporal.PlainDate.from("2014-01-10"),
 *   Interval.from(Temporal.PlainDate.from("2014-01-01"), Temporal.PlainDate.from("2014-01-07"))
 * )
 * //=> false
 */
export function isWithin(date: Temporal.PlainDate, interval: Interval<Temporal.PlainDate>): boolean {
  return interval.contains(date);
}
