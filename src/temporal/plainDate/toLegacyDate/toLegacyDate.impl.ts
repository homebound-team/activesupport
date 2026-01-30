import { Temporal } from "temporal-polyfill";

type TimeZoneAndTime = Parameters<Temporal.PlainDate["toZonedDateTime"]>[0];

export function toLegacyDateImpl(this: Temporal.PlainDate, timeZoneAndTime: TimeZoneAndTime): Date {
  return new Date(this.toZonedDateTime(timeZoneAndTime).epochMilliseconds);
}

export function toLegacyDate(date: Temporal.PlainDate, tzLike: TimeZoneAndTime): Date {
  return toLegacyDateImpl.call(date, tzLike);
}
