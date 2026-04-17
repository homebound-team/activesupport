import { Temporal } from "temporal-polyfill";

/**
 * Returns true if a ZonedDateTime is Monday, false otherwise.
 * @param date - A ZonedDateTime to check
 * @returns True if the date is Monday
 * @example
 * isMonday(Temporal.ZonedDateTime.from("2014-09-22T00:00:00.000+00:00[UTC]"))
 * //=> true
 * @example
 * isMonday(Temporal.ZonedDateTime.from("2014-09-23T00:00:00.000+00:00[UTC]"))
 * //=> false
 */
export function isMonday(date: Temporal.ZonedDateTime): boolean {
  return date.dayOfWeek === 1;
}

/**
 * Returns true if a ZonedDateTime is Tuesday, false otherwise.
 * @param date - A ZonedDateTime to check
 * @returns True if the date is Tuesday
 * @example
 * isTuesday(Temporal.ZonedDateTime.from("2014-09-23T00:00:00.000+00:00[UTC]"))
 * //=> true
 * @example
 * isTuesday(Temporal.ZonedDateTime.from("2014-09-22T00:00:00.000+00:00[UTC]"))
 * //=> false
 */
export function isTuesday(date: Temporal.ZonedDateTime): boolean {
  return date.dayOfWeek === 2;
}

/**
 * Returns true if a ZonedDateTime is Wednesday, false otherwise.
 * @param date - A ZonedDateTime to check
 * @returns True if the date is Wednesday
 * @example
 * isWednesday(Temporal.ZonedDateTime.from("2014-09-24T00:00:00.000+00:00[UTC]"))
 * //=> true
 * @example
 * isWednesday(Temporal.ZonedDateTime.from("2014-09-23T00:00:00.000+00:00[UTC]"))
 * //=> false
 */
export function isWednesday(date: Temporal.ZonedDateTime): boolean {
  return date.dayOfWeek === 3;
}

/**
 * Returns true if a ZonedDateTime is Thursday, false otherwise.
 * @param date - A ZonedDateTime to check
 * @returns True if the date is Thursday
 * @example
 * isThursday(Temporal.ZonedDateTime.from("2014-09-25T00:00:00.000+00:00[UTC]"))
 * //=> true
 * @example
 * isThursday(Temporal.ZonedDateTime.from("2014-09-24T00:00:00.000+00:00[UTC]"))
 * //=> false
 */
export function isThursday(date: Temporal.ZonedDateTime): boolean {
  return date.dayOfWeek === 4;
}

/**
 * Returns true if a ZonedDateTime is Friday, false otherwise.
 * @param date - A ZonedDateTime to check
 * @returns True if the date is Friday
 * @example
 * isFriday(Temporal.ZonedDateTime.from("2014-09-26T00:00:00.000+00:00[UTC]"))
 * //=> true
 * @example
 * isFriday(Temporal.ZonedDateTime.from("2014-09-25T00:00:00.000+00:00[UTC]"))
 * //=> false
 */
export function isFriday(date: Temporal.ZonedDateTime): boolean {
  return date.dayOfWeek === 5;
}

/**
 * Returns true if a ZonedDateTime is Saturday, false otherwise.
 * @param date - A ZonedDateTime to check
 * @returns True if the date is Saturday
 * @example
 * isSaturday(Temporal.ZonedDateTime.from("2014-09-27T00:00:00.000+00:00[UTC]"))
 * //=> true
 * @example
 * isSaturday(Temporal.ZonedDateTime.from("2014-09-26T00:00:00.000+00:00[UTC]"))
 * //=> false
 */
export function isSaturday(date: Temporal.ZonedDateTime): boolean {
  return date.dayOfWeek === 6;
}

/**
 * Returns true if a ZonedDateTime is Sunday, false otherwise.
 * @param date - A ZonedDateTime to check
 * @returns True if the date is Sunday
 * @example
 * isSunday(Temporal.ZonedDateTime.from("2014-09-28T00:00:00.000+00:00[UTC]"))
 * //=> true
 * @example
 * isSunday(Temporal.ZonedDateTime.from("2014-09-27T00:00:00.000+00:00[UTC]"))
 * //=> false
 */
export function isSunday(date: Temporal.ZonedDateTime): boolean {
  return date.dayOfWeek === 7;
}
