import { BusinessDayOptions, DayOfWeek, assertValidBusinessDays } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function isWeekend(date: Temporal.PlainDate, options: BusinessDayOptions = {}): boolean {
  assertValidBusinessDays(options);
  return !options.businessDays.includes(date.dayOfWeek as DayOfWeek);
}
