import { isWeekend } from "src/temporal/plainDate/isWeekend/isWeekend.impl";
import { BusinessDayOptions } from "src/temporal/utils";
import { isDefined } from "src/utils";
import { Temporal } from "temporal-polyfill";

export function addBusinessDays(
  date: Temporal.PlainDate,
  amount: number,
  options: BusinessDayOptions = {},
): Temporal.PlainDate {
  if (isNaN(amount)) throw new RangeError("amount cannot be NaN");

  const { exceptions = {} } = options;

  let current = date;

  amount = amount > 0 ? Math.floor(amount) : Math.ceil(amount);

  const step = amount < 0 ? -1 : 1;

  const isBusinessDay = (d: Temporal.PlainDate) => {
    const exception = exceptions[d.toString()];
    return isDefined(exception) ? exception : !isWeekend(d, options);
  };

  // start on the initial day and continue until we have gone through all the days
  amount = Math.abs(amount);
  while (amount > 0) {
    current = current.add({ days: step });
    if (isBusinessDay(current)) amount -= 1;
  }

  return current;
}
