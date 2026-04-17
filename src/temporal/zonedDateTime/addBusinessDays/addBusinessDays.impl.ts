import { addBusinessDays as addBusinessDaysPD } from "src/temporal/plainDate/addBusinessDays/addBusinessDays.impl";
import { BusinessDayOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

/**
 * Adds the specified number of business days (mon - fri) to a ZonedDateTime, ignoring weekends.
 * @param date - The ZonedDateTime to add business days to
 * @param amount - The amount of business days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @param options - An object with options.
 * @param options.businessDays - The business days. Default is Monday to Friday.
 * @param options.exceptions - Exceptions to the business days. Map of date string to boolean.
 * @returns The new ZonedDateTime with the business days added
 * @example
 * addBusinessDays(Temporal.ZonedDateTime.from("2014-09-01T00:00:00[UTC]"), 10)
 * //=> 2014-09-15T00:00:00[UTC] (skipped weekend days)
 */
export function addBusinessDays(
  date: Temporal.ZonedDateTime,
  amount: number,
  options: BusinessDayOptions = {},
): Temporal.ZonedDateTime {
  // Convert to a plain date then add our business days
  const result = addBusinessDaysPD(date.toPlainDate(), amount, options);
  // Restore our time zone and wall clock time (ignore DST adjustments)
  return result.toZonedDateTime({ timeZone: date, plainTime: date });
}
