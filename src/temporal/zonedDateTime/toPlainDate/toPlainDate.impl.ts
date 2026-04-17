import { Temporal } from "temporal-polyfill";

/**
 * Converts a ZonedDateTime to a PlainDate in Eastern Time (America/New_York).
 * @param date - A ZonedDateTime to convert
 * @returns The PlainDate in Eastern Time
 * @example
 * toPlainDateET(Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z"))
 * //=> PlainDate("2024-05-01")
 */
export function toPlainDateET(date: Temporal.ZonedDateTime): Temporal.PlainDate {
  return date.withTimeZone("America/New_York").toPlainDate();
}

/**
 * Converts a ZonedDateTime to a PlainDate in Central Time (America/Chicago).
 * @param date - A ZonedDateTime to convert
 * @returns The PlainDate in Central Time
 * @example
 * toPlainDateCT(Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z"))
 * //=> PlainDate("2024-05-01")
 */
export function toPlainDateCT(date: Temporal.ZonedDateTime): Temporal.PlainDate {
  return date.withTimeZone("America/Chicago").toPlainDate();
}

/**
 * Converts a ZonedDateTime to a PlainDate in Mountain Time (America/Denver).
 * @param date - A ZonedDateTime to convert
 * @returns The PlainDate in Mountain Time
 * @example
 * toPlainDateMT(Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z"))
 * //=> PlainDate("2024-05-01")
 */
export function toPlainDateMT(date: Temporal.ZonedDateTime): Temporal.PlainDate {
  return date.withTimeZone("America/Denver").toPlainDate();
}

/**
 * Converts a ZonedDateTime to a PlainDate in Pacific Time (America/Los_Angeles).
 * @param date - A ZonedDateTime to convert
 * @returns The PlainDate in Pacific Time
 * @example
 * toPlainDatePT(Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z"))
 * //=> PlainDate("2024-05-01")
 */
export function toPlainDatePT(date: Temporal.ZonedDateTime): Temporal.PlainDate {
  return date.withTimeZone("America/Los_Angeles").toPlainDate();
}

/**
 * Converts a ZonedDateTime to a PlainDate in UTC.
 * @param date - A ZonedDateTime to convert
 * @returns The PlainDate in UTC
 * @example
 * toPlainDateUTC(Temporal.ZonedDateTime.from("2024-05-02T04:00:00.000+09:00[Asia/Tokyo]"))
 * //=> PlainDate("2024-05-01")
 */
export function toPlainDateUTC(date: Temporal.ZonedDateTime): Temporal.PlainDate {
  return date.withTimeZone("UTC").toPlainDate();
}
