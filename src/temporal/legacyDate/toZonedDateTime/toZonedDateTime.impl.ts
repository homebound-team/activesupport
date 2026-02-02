import { Temporal, toTemporalInstant } from "temporal-polyfill";

/**
 * Converts the legacy Date object to a Temporal.ZonedDateTime in the specified timezone.
 * First converts to an Instant, then to a ZonedDateTime in the given timezone.
 * @param tzLike A timezone identifier (e.g., "America/New_York", "UTC") or Temporal timezone object
 * @returns A Temporal.ZonedDateTime representing this Date in the specified timezone
 * @example new Date("2023-05-02T12:00:00Z").toZonedDateTime("America/New_York") //=> ZonedDateTime in ET
 * @example new Date("2023-05-02T12:00:00Z").toZonedDateTime("UTC") //=> ZonedDateTime in UTC
 */
export function toZonedDateTime(date: Date, tzLike: Temporal.TimeZoneLike) {
  return toTemporalInstant.call(date).toZonedDateTimeISO(tzLike);
}
