import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

export function isWithin(date: Temporal.ZonedDateTime, interval: Interval<Temporal.ZonedDateTime>): boolean {
  return interval.contains(date);
}
