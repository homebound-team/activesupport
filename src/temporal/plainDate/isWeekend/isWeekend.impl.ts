import { BusinessDayOptions, DayOfWeek, assertValidBusinessDays } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

/**
 * Returns true if a PlainDate falls on a weekend.
 * @param date - The date to check
 * @param options - An object with options
 * @returns True if the date falls on a weekend
 * @example
 * isWeekend(Temporal.PlainDate.from("2014-10-05"))
 * //=> true
 * @example
 * // With custom business days:
 * isWeekend(Temporal.PlainDate.from("2014-10-05"), { businessDays: [6,7] })
 * //=> false
 */
export function isWeekend(date: Temporal.PlainDate, options: BusinessDayOptions = {}): boolean {
  assertValidBusinessDays(options);
  return !options.businessDays.includes(date.dayOfWeek as DayOfWeek);
}
