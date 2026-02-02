import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

/**
 * @name toInterval
 * @category Interval Helpers
 * @summary returns an interval between the gives dates
 *
 * @param end the end of the interval
 *
 * @description
 * Returns an interval between the gives dates
 *
 * @returns Temporal.Interval
 */
export function toInterval(
  date: Temporal.ZonedDateTime,
  end: Temporal.ZonedDateTime,
): Interval<Temporal.ZonedDateTime> {
  return Interval.from(date, end);
}
