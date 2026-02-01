import { differenceInBusinessDays as differenceInBusinessDaysPD } from "src/temporal/plainDate/differenceInBusinessDays/differenceInBusinessDays.impl";
import { BusinessDayOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function differenceInBusinessDays(
  date: Temporal.ZonedDateTime,
  other: Temporal.ZonedDateTime,
  options: BusinessDayOptions = {},
): number {
  return differenceInBusinessDaysPD(date.toPlainDate(), other.toPlainDate(), options);
}
