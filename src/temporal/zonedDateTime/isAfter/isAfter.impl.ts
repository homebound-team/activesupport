import { Temporal } from "temporal-polyfill";

/**
 * Returns true if the first ZonedDateTime is after the second one.
 * @param date - The ZonedDateTime to check
 * @param other - The ZonedDateTime to compare with
 * @returns True if the first ZonedDateTime is after the second ZonedDateTime
 * @example
 * isAfter(Temporal.ZonedDateTime.from("1989-07-10T00:00:00[UTC]"), Temporal.ZonedDateTime.from("1987-02-11T00:00:00[UTC]"))
 * //=> true
 */
export function isAfter(date: Temporal.ZonedDateTime, other: Temporal.ZonedDateTime): boolean {
  return Temporal.ZonedDateTime.compare(date, other) === 1;
}
