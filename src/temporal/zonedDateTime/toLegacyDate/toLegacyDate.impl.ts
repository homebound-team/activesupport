import { Temporal } from "temporal-polyfill";

/**
 * Converts the ZonedDateTime to a legacy JavaScript Date object.
 * The Date will represent the same instant in time by using the ZonedDateTime's epoch milliseconds.
 * @returns A JavaScript Date object representing this instant in time
 * @example Temporal.ZonedDateTime.from("2023-05-02T12:11:36.438Z").toLegacyDate() //=> Date("2023-05-02T12:11:36.438Z")
 */
export function toLegacyDate(date: Temporal.ZonedDateTime): Date {
  return new Date(date.epochMilliseconds);
}
