import { Temporal } from "temporal-polyfill";

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param date - The date to check
 * @param other - The date to compare with
 * @returns The first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * isAfter(Temporal.PlainDate.from("1989-07-10"), Temporal.PlainDate.from("1987-02-11"))
 * //=> true
 */
export function isAfter(date: Temporal.PlainDate, other: Temporal.PlainDate): boolean {
  return Temporal.PlainDate.compare(date, other) === 1;
}
