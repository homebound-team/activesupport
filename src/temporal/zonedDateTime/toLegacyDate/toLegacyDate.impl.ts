import { Temporal } from "temporal-polyfill";

export function toLegacyDateImpl(this: Temporal.ZonedDateTime): Date {
  return new Date(this.epochMilliseconds);
}

export function toLegacyDate(date: Temporal.ZonedDateTime): Date {
  return toLegacyDateImpl.call(date);
}
