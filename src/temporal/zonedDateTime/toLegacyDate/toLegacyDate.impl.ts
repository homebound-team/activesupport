import { Temporal } from "temporal-polyfill";

export function toLegacyDate(date: Temporal.ZonedDateTime): Date {
  return new Date(date.epochMilliseconds);
}
