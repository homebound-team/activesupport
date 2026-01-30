import { BusinessDay, assertValidBusinessDays } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function isWeekendImpl(this: Temporal.ZonedDateTime, options: { businessDays?: BusinessDay[] } = {}): boolean {
  assertValidBusinessDays(options);
  return !options.businessDays.includes(this.dayOfWeek as BusinessDay);
}

export function isWeekend(date: Temporal.ZonedDateTime, options: { businessDays?: BusinessDay[] } = {}): boolean {
  return isWeekendImpl.call(date, options);
}
