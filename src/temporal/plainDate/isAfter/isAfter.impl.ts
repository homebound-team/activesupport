import { Temporal } from "temporal-polyfill";

export function isAfterImpl(this: Temporal.PlainDate, other: Temporal.PlainDate): boolean {
  return Temporal.PlainDate.compare(this, other) === 1;
}

export function isAfter(date: Temporal.PlainDate, other: Temporal.PlainDate): boolean {
  return isAfterImpl.call(date, other);
}
