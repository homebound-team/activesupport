import { Temporal, toTemporalInstant } from "temporal-polyfill";

/**
 * Converts a legacy Date object to a Temporal.ZonedDateTime in the specified timezone.
 * First converts to an Instant, then to a ZonedDateTime in the given timezone.
 * @param date The Date object to convert
 * @param tzLike A timezone identifier (e.g., "America/New_York", "UTC") or Temporal timezone object
 * @returns A Temporal.ZonedDateTime representing the Date in the specified timezone
 * @example toZonedDateTime(new Date("2023-05-02T12:00:00Z"), "America/New_York") //=> ZonedDateTime in ET
 * @example toZonedDateTime(new Date("2023-05-02T12:00:00Z"), "UTC") //=> ZonedDateTime in UTC
 */
export function toZonedDateTime(date: Date, tzLike: Temporal.TimeZoneLike) {
  return toTemporalInstant.call(date).toZonedDateTimeISO(tzLike);
}
