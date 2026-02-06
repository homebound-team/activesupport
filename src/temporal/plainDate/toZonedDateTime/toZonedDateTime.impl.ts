import { Temporal } from "temporal-polyfill";

/**
 * Converts a PlainDate to a ZonedDateTime in Eastern Time (America/New_York).
 * @param date - A PlainDate to convert
 * @returns The ZonedDateTime in Eastern Time
 * @example
 * toET(Temporal.PlainDate.from("2024-05-02"))
 * //=> ZonedDateTime("2024-05-02T04:00:00.000Z")
 */
export function toET(date: Temporal.PlainDate) {
  return date.toZonedDateTime("America/New_York");
}

/**
 * Converts a PlainDate to a ZonedDateTime in Central Time (America/Chicago).
 * @param date - A PlainDate to convert
 * @returns The ZonedDateTime in Central Time
 * @example
 * toCT(Temporal.PlainDate.from("2024-05-02"))
 * //=> ZonedDateTime("2024-05-02T05:00:00.000Z")
 */
export function toCT(date: Temporal.PlainDate) {
  return date.toZonedDateTime("America/Chicago");
}

/**
 * Converts a PlainDate to a ZonedDateTime in Mountain Time (America/Denver).
 * @param date - A PlainDate to convert
 * @returns The ZonedDateTime in Mountain Time
 * @example
 * toMT(Temporal.PlainDate.from("2024-05-02"))
 * //=> ZonedDateTime("2024-05-02T06:00:00.000Z")
 */
export function toMT(date: Temporal.PlainDate) {
  return date.toZonedDateTime("America/Denver");
}

/**
 * Converts a PlainDate to a ZonedDateTime in Pacific Time (America/Los_Angeles).
 * @param date - A PlainDate to convert
 * @returns The ZonedDateTime in Pacific Time
 * @example
 * toPT(Temporal.PlainDate.from("2024-05-02"))
 * //=> ZonedDateTime("2024-05-02T07:00:00.000Z")
 */
export function toPT(date: Temporal.PlainDate) {
  return date.toZonedDateTime("America/Los_Angeles");
}

/**
 * Converts a PlainDate to a ZonedDateTime in UTC.
 * @param date - A PlainDate to convert
 * @returns The ZonedDateTime in UTC
 * @example
 * toUTC(Temporal.PlainDate.from("2024-05-02"))
 * //=> ZonedDateTime("2024-05-02T00:00:00.000Z")
 */
export function toUTC(date: Temporal.PlainDate) {
  return date.toZonedDateTime("UTC");
}
