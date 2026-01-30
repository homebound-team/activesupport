import { BusinessDayOptions, DayOfWeek, assertValidBusinessDays } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function isWeekendImpl(this: Temporal.PlainDate, options: BusinessDayOptions = {}): boolean {
  assertValidBusinessDays(options);
  return !options.businessDays.includes(this.dayOfWeek as DayOfWeek);
}

export function isWeekend(date: Temporal.PlainDate, options: BusinessDayOptions = {}): boolean {
  return isWeekendImpl.call(date, options);
}
