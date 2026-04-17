import { Temporal } from "temporal-polyfill";

/**
 * Returns true if a PlainDate is Monday, false otherwise.
 * @param date - A PlainDate to check
 * @returns True if the date is Monday
 * @example
 * isMonday(Temporal.PlainDate.from("2014-09-22"))
 * //=> true
 * @example
 * isMonday(Temporal.PlainDate.from("2014-09-23"))
 * //=> false
 */
export function isMonday(date: Temporal.PlainDate): boolean {
  return date.dayOfWeek === 1;
}

/**
 * Returns true if a PlainDate is Tuesday, false otherwise.
 * @param date - A PlainDate to check
 * @returns True if the date is Tuesday
 * @example
 * isTuesday(Temporal.PlainDate.from("2014-09-23"))
 * //=> true
 * @example
 * isTuesday(Temporal.PlainDate.from("2014-09-22"))
 * //=> false
 */
export function isTuesday(date: Temporal.PlainDate): boolean {
  return date.dayOfWeek === 2;
}

/**
 * Returns true if a PlainDate is Wednesday, false otherwise.
 * @param date - A PlainDate to check
 * @returns True if the date is Wednesday
 * @example
 * isWednesday(Temporal.PlainDate.from("2014-09-24"))
 * //=> true
 * @example
 * isWednesday(Temporal.PlainDate.from("2014-09-23"))
 * //=> false
 */
export function isWednesday(date: Temporal.PlainDate): boolean {
  return date.dayOfWeek === 3;
}

/**
 * Returns true if a PlainDate is Thursday, false otherwise.
 * @param date - A PlainDate to check
 * @returns True if the date is Thursday
 * @example
 * isThursday(Temporal.PlainDate.from("2014-09-25"))
 * //=> true
 * @example
 * isThursday(Temporal.PlainDate.from("2014-09-24"))
 * //=> false
 */
export function isThursday(date: Temporal.PlainDate): boolean {
  return date.dayOfWeek === 4;
}

/**
 * Returns true if a PlainDate is Friday, false otherwise.
 * @param date - A PlainDate to check
 * @returns True if the date is Friday
 * @example
 * isFriday(Temporal.PlainDate.from("2014-09-26"))
 * //=> true
 * @example
 * isFriday(Temporal.PlainDate.from("2014-09-25"))
 * //=> false
 */
export function isFriday(date: Temporal.PlainDate): boolean {
  return date.dayOfWeek === 5;
}

/**
 * Returns true if a PlainDate is Saturday, false otherwise.
 * @param date - A PlainDate to check
 * @returns True if the date is Saturday
 * @example
 * isSaturday(Temporal.PlainDate.from("2014-09-27"))
 * //=> true
 * @example
 * isSaturday(Temporal.PlainDate.from("2014-09-26"))
 * //=> false
 */
export function isSaturday(date: Temporal.PlainDate): boolean {
  return date.dayOfWeek === 6;
}

/**
 * Returns true if a PlainDate is Sunday, false otherwise.
 * @param date - A PlainDate to check
 * @returns True if the date is Sunday
 * @example
 * isSunday(Temporal.PlainDate.from("2014-09-28"))
 * //=> true
 * @example
 * isSunday(Temporal.PlainDate.from("2014-09-27"))
 * //=> false
 */
export function isSunday(date: Temporal.PlainDate): boolean {
  return date.dayOfWeek === 7;
}
