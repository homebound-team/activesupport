import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

export function toInterval(
  date: Temporal.ZonedDateTime,
  end: Temporal.ZonedDateTime,
): Interval<Temporal.ZonedDateTime> {
  return Interval.from(date, end);
}
