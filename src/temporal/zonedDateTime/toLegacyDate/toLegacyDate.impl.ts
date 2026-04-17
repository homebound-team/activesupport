import { Temporal } from "temporal-polyfill";

/**
 * Converts a ZonedDateTime to a legacy JavaScript Date object.
 * The Date will represent the same instant in time by using the ZonedDateTime's epoch milliseconds.
 * @param date - The ZonedDateTime to convert
 * @returns A legacy Date representing the same instant in time
 * @example
 * toLegacyDate(Temporal.ZonedDateTime.from("2023-05-02T12:11:36.438+00:00[UTC]"))
 * //=> Date("2023-05-02T12:11:36.438Z")
 */
export function toLegacyDate(date: Temporal.ZonedDateTime): Date {
  return new Date(date.epochMilliseconds);
}
