import { Temporal } from "temporal-polyfill";

/**
 * Returns true if the first date is after the second one.
 * @param date - The date to check
 * @param other - The date to compare with
 * @returns True if the first date is after the second date
 * @example
 * isAfter(Temporal.PlainDate.from("1989-07-10"), Temporal.PlainDate.from("1987-02-11"))
 * //=> true
 */
export function isAfter(date: Temporal.PlainDate, other: Temporal.PlainDate): boolean {
  return Temporal.PlainDate.compare(date, other) === 1;
}
