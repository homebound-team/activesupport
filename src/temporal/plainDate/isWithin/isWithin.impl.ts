import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

export function isWithin(date: Temporal.PlainDate, interval: Interval<Temporal.PlainDate>): boolean {
  return interval.contains(date);
}
