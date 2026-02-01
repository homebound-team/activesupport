import { Temporal } from "temporal-polyfill";

type TimeZoneAndTime = Parameters<Temporal.PlainDate["toZonedDateTime"]>[0];

export function toLegacyDate(date: Temporal.PlainDate, tzLike: TimeZoneAndTime): Date {
  return new Date(date.toZonedDateTime(tzLike).epochMilliseconds);
}
