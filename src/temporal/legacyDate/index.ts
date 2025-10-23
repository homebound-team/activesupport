import { Temporal, toTemporalInstant } from "temporal-polyfill";

declare global {
  interface Date {
    /**
     * Converts the legacy Date object to a Temporal.Instant.
     * This method is part of the Temporal spec and will be added in native implementations automatically.
     * An Instant represents a fixed point in time with nanosecond precision.
     * @returns A Temporal.Instant representing this Date's point in time
     * @example new Date("2023-05-02T12:00:00Z").toTemporalInstant() //=> Temporal.Instant
     */
    toTemporalInstant(): Temporal.Instant;

    /**
     * Converts the legacy Date object to a Temporal.ZonedDateTime in the specified timezone.
     * First converts to an Instant, then to a ZonedDateTime in the given timezone.
     * @param tzLike A timezone identifier (e.g., "America/New_York", "UTC") or Temporal timezone object
     * @returns A Temporal.ZonedDateTime representing this Date in the specified timezone
     * @example new Date("2023-05-02T12:00:00Z").toZonedDateTime("America/New_York") //=> ZonedDateTime in ET
     * @example new Date("2023-05-02T12:00:00Z").toZonedDateTime("UTC") //=> ZonedDateTime in UTC
     */
    toZonedDateTime(tzLike: Temporal.TimeZoneLike): Temporal.ZonedDateTime;

    /**
     * Converts the legacy Date object to a Temporal.PlainDate in the specified timezone.
     * Extracts the calendar date portion after converting to the given timezone.
     * @param tzLike A timezone identifier (e.g., "America/New_York", "UTC") or Temporal timezone object
     * @returns A Temporal.PlainDate representing the calendar date in the specified timezone
     * @example new Date("2023-05-02T23:00:00Z").toPlainDate("UTC") //=> PlainDate("2023-05-02")
     * @example new Date("2023-05-02T23:00:00Z").toPlainDate("America/New_York") //=> PlainDate("2023-05-02")
     */
    toPlainDate(tzLike: Temporal.TimeZoneLike): Temporal.PlainDate;
  }
}

Date.prototype.toTemporalInstant = toTemporalInstant;

Date.prototype.toZonedDateTime = function (tzLike: Temporal.TimeZoneLike) {
  return this.toTemporalInstant().toZonedDateTimeISO(tzLike);
};

Date.prototype.toPlainDate = function (tzLike: Temporal.TimeZoneLike) {
  return this.toTemporalInstant().toZonedDateTimeISO(tzLike).toPlainDate();
};
