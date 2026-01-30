import { addBusinessDaysImpl as addBusinessDaysPD } from "src/temporal/plainDate/addBusinessDays/addBusinessDays.impl";
import { BusinessDayOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function addBusinessDaysImpl(
  this: Temporal.ZonedDateTime,
  amount: number,
  options: BusinessDayOptions = {},
): Temporal.ZonedDateTime {
  // Convert to a plain date then add our business days
  const result = addBusinessDaysPD.call(this.toPlainDate(), amount, options);
  // Restore our time zone and wall clock time (ignore DST adjustments)
  return result.toZonedDateTime({ timeZone: this, plainTime: this });
}

export function addBusinessDays(
  date: Temporal.ZonedDateTime,
  amount: number,
  options: BusinessDayOptions = {},
): Temporal.ZonedDateTime {
  return addBusinessDaysImpl.call(date, amount, options);
}
