import { Temporal } from "temporal-polyfill";

export function isBeforeImpl(this: Temporal.PlainDate, other: Temporal.PlainDate): boolean {
  return Temporal.PlainDate.compare(this, other) === -1;
}

export function isBefore(date: Temporal.PlainDate, other: Temporal.PlainDate): boolean {
  return isBeforeImpl.call(date, other);
}
