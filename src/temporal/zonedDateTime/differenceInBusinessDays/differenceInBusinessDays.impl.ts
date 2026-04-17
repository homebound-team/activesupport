import { differenceInBusinessDays as differenceInBusinessDaysPD } from "src/temporal/plainDate/differenceInBusinessDays/differenceInBusinessDays.impl";
import { BusinessDayOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

/**
 * Returns the number of business day periods between two ZonedDateTimes.
 * Business days being days that aren't in the weekend.
 * The function removes the times from the ZonedDateTimes before calculating the difference.
 * @param date - The later ZonedDateTime
 * @param other - The earlier ZonedDateTime
 * @param options - An object with options.
 * @param options.businessDays - The business days. Default is Monday to Friday.
 * @param options.exceptions - Exceptions to the business days. Map of date string to boolean.
 * @returns The number of business days
 * @example
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
