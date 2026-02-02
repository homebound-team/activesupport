import { differenceInBusinessDays as differenceInBusinessDaysPD } from "src/temporal/plainDate/differenceInBusinessDays/differenceInBusinessDays.impl";
import { BusinessDayOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

/**
 * @name differenceInBusinessDays
 * @category Day Helpers
 * @summary Get the number of business days between two dates.
 *
 * @description
 * Get the number of business day periods between two dates.
 * Business days being days that aren't in the weekend.
 * The function removes the times from the dates before calculating the difference.
 *
 * @param date - The later date
 * @param other - The earlier date
 * @param options - An object with options.
 * @returns The number of business days
 *
 * @example
 * // How many business days are between 10 January 2014 and 20 July 2014?
 * differenceInBusinessDays(
 *   Temporal.ZonedDateTime.from("2014-07-20T00:00:00[UTC]"),
 *   Temporal.ZonedDateTime.from("2014-01-10T00:00:00[UTC]")
 * )
 * //=> 136
 */
export function differenceInBusinessDays(
  date: Temporal.ZonedDateTime,
  other: Temporal.ZonedDateTime,
  options: BusinessDayOptions = {},
): number {
  return differenceInBusinessDaysPD(date.toPlainDate(), other.toPlainDate(), options);
}
