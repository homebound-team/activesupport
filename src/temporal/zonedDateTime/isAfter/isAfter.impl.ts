import { Temporal } from "temporal-polyfill";

/**
 * Returns true if the first date is after the second one.
 * @param date - The date to check
 * @param other - The date to compare with
 * @returns True if the first date is after the second date
 * @example
 * isAfter(Temporal.ZonedDateTime.from("1989-07-10T00:00:00[UTC]"), Temporal.ZonedDateTime.from("1987-02-11T00:00:00[UTC]"))
 * //=> true
 */
export function isAfter(date: Temporal.ZonedDateTime, other: Temporal.ZonedDateTime): boolean {
  return Temporal.ZonedDateTime.compare(date, other) === 1;
}
