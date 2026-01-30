import { Temporal } from "temporal-polyfill";

export function isAfterImpl(this: Temporal.ZonedDateTime, other: Temporal.ZonedDateTime): boolean {
  return Temporal.ZonedDateTime.compare(this, other) === 1;
}

export function isAfter(date: Temporal.ZonedDateTime, other: Temporal.ZonedDateTime): boolean {
  return isAfterImpl.call(date, other);
}
