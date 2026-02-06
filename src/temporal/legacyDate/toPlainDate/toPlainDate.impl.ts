import { Temporal, toTemporalInstant } from "temporal-polyfill";

/**
 * Converts a legacy Date object to a Temporal.PlainDate in the specified timezone.
 * Extracts the calendar date portion after converting to the given timezone.
 * @param date - The Date object to convert
 * @param tzLike - A timezone identifier (e.g., "America/New_York", "UTC") or Temporal timezone object
 * @returns A Temporal.PlainDate representing the calendar date in the specified timezone
 * @example
 * toPlainDate(new Date("2023-05-02T23:00:00Z"), "UTC")
 * //=> PlainDate("2023-05-02")
 * @example
 * toPlainDate(new Date("2023-05-02T23:00:00Z"), "America/New_York")
 * //=> PlainDate("2023-05-02")
 */
export function toPlainDate(date: Date, tzLike: Temporal.TimeZoneLike) {
  return toTemporalInstant.call(date).toZonedDateTimeISO(tzLike).toPlainDate();
}
