import { isWeekend } from "src/temporal/plainDate/isWeekend/isWeekend.impl";
import { BusinessDayOptions } from "src/temporal/utils";
import { isDefined } from "src/utils";
import { Temporal } from "temporal-polyfill";

/**
 * Adds the specified number of business days (mon - fri) to a PlainDate, ignoring weekends.
 * @param date - The date to add business days to
 * @param amount - The amount of business days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @param options - An object with options.
 * @param options.businessDays - The business days. Default is Monday to Friday.
 * @param options.exceptions - Exceptions to the business days. Map of date string to boolean.
 * @returns The new date with the business days added
 * @example
 * addBusinessDays(Temporal.PlainDate.from("2014-09-01"), 10)
 * //=> Mon Sep 15 2014 (skipped weekend days)
 */
export function addBusinessDays(
  date: Temporal.PlainDate,
  amount: number,
  options: BusinessDayOptions = {},
): Temporal.PlainDate {
  if (isNaN(amount)) throw new RangeError("amount cannot be NaN");

  const { exceptions = {} } = options;

  let current = date;

  amount = amount > 0 ? Math.floor(amount) : Math.ceil(amount);

  const step = amount < 0 ? -1 : 1;

  const isBusinessDay = (d: Temporal.PlainDate) => {
    const exception = exceptions[d.toString()];
    return isDefined(exception) ? exception : !isWeekend(d, options);
  };

  // start on the initial day and continue until we have gone through all the days
  amount = Math.abs(amount);
  while (amount > 0) {
    current = current.add({ days: step });
    if (isBusinessDay(current)) amount -= 1;
  }

  return current;
}
