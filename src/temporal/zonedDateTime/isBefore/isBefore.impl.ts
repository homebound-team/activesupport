import { Temporal } from "temporal-polyfill";

export function isBefore(date: Temporal.ZonedDateTime, other: Temporal.ZonedDateTime): boolean {
  return Temporal.ZonedDateTime.compare(date, other) === -1;
}
