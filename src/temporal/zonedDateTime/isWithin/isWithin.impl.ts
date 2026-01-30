import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

export function isWithinImpl(this: Temporal.ZonedDateTime, interval: Interval<Temporal.ZonedDateTime>): boolean {
  return interval.contains(this);
}

export function isWithin(date: Temporal.ZonedDateTime, interval: Interval<Temporal.ZonedDateTime>): boolean {
  return isWithinImpl.call(date, interval);
}
