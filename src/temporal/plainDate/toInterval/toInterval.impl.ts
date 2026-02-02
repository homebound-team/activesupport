import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

/**
 * @name toInterval
 * @category Interval Helpers
 * @summary Returns an interval between two dates.
 *
 * @description
 * Returns an interval between the given dates.
 *
 * @param start - The start of the interval
 * @param end - The end of the interval
 * @returns An Interval from start to end
 *
 * @example
 * toInterval(Temporal.PlainDate.from("2024-01-01"), Temporal.PlainDate.from("2024-01-31"))
 * //=> Interval { start: 2024-01-01, end: 2024-01-31 }
 */
export function toInterval(start: Temporal.PlainDate, end: Temporal.PlainDate): Interval<Temporal.PlainDate> {
  return Interval.from(start, end);
}
