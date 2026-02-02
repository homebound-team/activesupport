import { Temporal } from "temporal-polyfill";

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param other - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 11 February 1987 before 10 July 1989?
 * const result = Temporal.ZonedDateTime.from("1987-02-11").isBefore(Temporal.ZonedDateTime.from("1989-07-10"))
 * //=> true
 */
export function isBefore(date: Temporal.ZonedDateTime, other: Temporal.ZonedDateTime): boolean {
  return Temporal.ZonedDateTime.compare(date, other) === -1;
}
