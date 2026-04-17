import { Temporal } from "temporal-polyfill";

/**
 * Returns true if the first PlainDate is before the second one.
 * @param date - The PlainDate to check
 * @param other - The PlainDate to compare with
 * @returns True if the first PlainDate is before the second PlainDate
 * @example
 * isBefore(Temporal.PlainDate.from("1987-02-11"), Temporal.PlainDate.from("1989-07-10"))
 * //=> true
 */
export function isBefore(date: Temporal.PlainDate, other: Temporal.PlainDate): boolean {
  return Temporal.PlainDate.compare(date, other) === -1;
}
