import { addBusinessDays as addBusinessDaysPD } from "src/temporal/plainDate/addBusinessDays/addBusinessDays.impl";
import { BusinessDayOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

/**
 * @name addBusinessDays
 * @category Day Helpers
 * @summary Add the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @param {Number} businessDays - the amount of business days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @param {Object} [options] - an object with options.
 * @param {Number[]} [options.businessDays=[1, 2, 3, 4, 5]] - the business days. default is Monday to Friday.
 * @param {Record<string, boolean>} [options.exceptions={}] - exceptions to the business days. Map of date string (with format "MM/DD/YY") to boolean.
 * @returns {Date} the new date with the business days added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 10 business days to 1 September 2014:
 * const result = Temporal.ZonedDateTime.from("2014-09-01").addBusinessDays(10)
 * //=> Mon Sep 15 2014 (skipped weekend days)
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
