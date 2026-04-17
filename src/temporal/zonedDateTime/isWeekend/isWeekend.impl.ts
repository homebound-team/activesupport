import { DayOfWeek, assertValidBusinessDays } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

/**
 * Returns true if a ZonedDateTime falls on a weekend.
 * @param date - The ZonedDateTime to check
 * @param options - An object with options
 * @returns True if the ZonedDateTime falls on a weekend
 * @example
 * isWeekend(Temporal.ZonedDateTime.from("2014-10-05T00:00:00[UTC]"))
 * //=> true
 * @example
 * // With custom business days:
 * isWeekend(Temporal.ZonedDateTime.from("2014-10-05T00:00:00[UTC]"), { businessDays: [6,7] })
 * //=> false
 */
export function isWeekend(date: Temporal.ZonedDateTime, options: { businessDays?: DayOfWeek[] } = {}): boolean {
  assertValidBusinessDays(options);
  return !options.businessDays.includes(date.dayOfWeek as DayOfWeek);
}
