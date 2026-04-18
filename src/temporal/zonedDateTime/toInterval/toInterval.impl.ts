import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

/**
 * Returns an interval between the given ZonedDateTimes.
 * @param date - The start of the interval
 * @param end - The end of the interval
 * @returns An Interval from start to end
 * @example
 * toInterval(Temporal.ZonedDateTime.from("2024-01-01T00:00:00[UTC]"), Temporal.ZonedDateTime.from("2024-01-31T00:00:00[UTC]"))
 * //=> Interval { start: 2024-01-01T00:00:00+00:00[UTC], end: 2024-01-31T00:00:00+00:00[UTC] }
 */
export function toInterval(
  date: Temporal.ZonedDateTime,
  end: Temporal.ZonedDateTime,
): Interval<Temporal.ZonedDateTime> {
  return Interval.from(date, end);
}
