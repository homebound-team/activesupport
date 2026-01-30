import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

export function toIntervalImpl(
  this: Temporal.ZonedDateTime,
  end: Temporal.ZonedDateTime,
): Interval<Temporal.ZonedDateTime> {
  return Interval.from(this, end);
}

export function toInterval(
  date: Temporal.ZonedDateTime,
  end: Temporal.ZonedDateTime,
): Temporal.Interval<Temporal.ZonedDateTime> {
  return toIntervalImpl.call(date, end);
}
