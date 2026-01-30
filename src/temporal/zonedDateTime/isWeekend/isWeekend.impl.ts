import { DayOfWeek, assertValidBusinessDays } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function isWeekendImpl(this: Temporal.ZonedDateTime, options: { businessDays?: DayOfWeek[] } = {}): boolean {
  assertValidBusinessDays(options);
  return !options.businessDays.includes(this.dayOfWeek as DayOfWeek);
}

export function isWeekend(date: Temporal.ZonedDateTime, options: { businessDays?: DayOfWeek[] } = {}): boolean {
  return isWeekendImpl.call(date, options);
}
