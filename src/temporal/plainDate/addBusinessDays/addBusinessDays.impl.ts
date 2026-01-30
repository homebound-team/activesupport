import { isWeekendImpl } from "src/temporal/plainDate/isWeekend/isWeekend.impl";
import { BusinessDayOptions } from "src/temporal/utils";
import { isDefined } from "src/utils";
import { Temporal } from "temporal-polyfill";

export function addBusinessDaysImpl(
  this: Temporal.PlainDate,
  amount: number,
  options: BusinessDayOptions = {},
): Temporal.PlainDate {
  if (isNaN(amount)) throw new RangeError("amount cannot be NaN");

  const { exceptions = {} } = options;

  let current = this;

  amount = amount > 0 ? Math.floor(amount) : Math.ceil(amount);

  const step = amount < 0 ? -1 : 1;

  const isBusinessDay = (date: Temporal.PlainDate) => {
    const exception = exceptions[date.toString()];
    return isDefined(exception) ? exception : !isWeekendImpl.call(date, options);
  };

  // start on the initial day and continue until we have gone through all the days
  amount = Math.abs(amount);
  while (amount > 0) {
    current = current.add({ days: step });
    if (isBusinessDay(current)) amount -= 1;
  }

  return current;
}

export function addBusinessDays(
  date: Temporal.PlainDate,
  businessDays: number,
  options?: BusinessDayOptions,
): Temporal.PlainDate {
  return addBusinessDaysImpl.call(date, businessDays, options);
}
