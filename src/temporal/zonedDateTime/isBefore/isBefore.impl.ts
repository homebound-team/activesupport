import { Temporal } from "temporal-polyfill";

export function isBeforeImpl(this: Temporal.ZonedDateTime, other: Temporal.ZonedDateTime): boolean {
  return Temporal.ZonedDateTime.compare(this, other) === -1;
}

export function isBefore(date: Temporal.ZonedDateTime, other: Temporal.ZonedDateTime): boolean {
  return isBeforeImpl.call(date, other);
}
