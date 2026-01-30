import { differenceInBusinessDaysImpl as differenceInBusinessDaysPD } from "src/temporal/plainDate/differenceInBusinessDays/differenceInBusinessDays.impl";
import { BusinessDayOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function differenceInBusinessDaysImpl(
  this: Temporal.ZonedDateTime,
  other: Temporal.ZonedDateTime,
  options: BusinessDayOptions = {},
): number {
  return differenceInBusinessDaysPD.call(this.toPlainDate(), other.toPlainDate(), options);
}

export function differenceInBusinessDays(
  date: Temporal.ZonedDateTime,
  other: Temporal.ZonedDateTime,
  options: BusinessDayOptions = {},
): number {
  return differenceInBusinessDaysImpl.call(date, other, options);
}
