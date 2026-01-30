import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

export function toIntervalImpl(this: Temporal.PlainDate, end: Temporal.PlainDate): Interval<Temporal.PlainDate> {
  return Interval.from(this, end);
}

export function toInterval(start: Temporal.PlainDate, end: Temporal.PlainDate): Interval<Temporal.PlainDate> {
  return toIntervalImpl.call(start, end);
}
