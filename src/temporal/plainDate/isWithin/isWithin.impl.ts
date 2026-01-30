import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

export function isWithinImpl(this: Temporal.PlainDate, interval: Interval<Temporal.PlainDate>): boolean {
  return interval.contains(this);
}

export function isWithin(date: Temporal.PlainDate, interval: Interval<Temporal.PlainDate>): boolean {
  return isWithinImpl.call(date, interval);
}
