import { Temporal } from "temporal-polyfill";
import { isDefined } from "../../utils";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * @name addBusinessDays
       * @category Day Helpers
       * @summary Add the specified number of business days (mon - fri) to the given date.
       *
       * @description
       * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
       *
       * @param {Number} businessDays - the amount of business days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
       * @param {Object} [options] - an object with options.
       * @param {Number[]} [options.businessDays=[1, 2, 3, 4, 5]] - the business days. default is Monday to Friday.
       * @param {Record<string, boolean>} [options.exceptions={}] - exceptions to the business days. Map of date string (with format "MM/DD/YY") to boolean.
       * @returns {Date} the new date with the business days added
       * @throws {TypeError} 2 arguments required
       *
       * @example
       * // Add 10 business days to 1 September 2014:
       * const result = Temporal.PlainDate.from("2014-09-01").addBusinessDays(10)
       * //=> Mon Sep 15 2014 (skipped weekend days)
       */
      addBusinessDays(businessDays: number, options?: BusinessDayOptions): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.addBusinessDays = function (
  amount: number,
  options: Temporal.BusinessDayOptions = {},
): Temporal.PlainDate {
  if (isNaN(amount)) throw new RangeError("amount cannot be NaN");

  const { exceptions = {} } = options;

  let current = this;

  amount = amount > 0 ? Math.floor(amount) : Math.ceil(amount);

  const step = amount < 0 ? -1 : 1;

  const isBusinessDay = (date: Temporal.PlainDate) => {
    const exception = exceptions[date.toString()];
    return isDefined(exception) ? exception : !date.isWeekend(options);
  };

  // start on initial day and continue until we have gone through all the days
  amount = Math.abs(amount);
  while (amount > 0) {
    current = current.add({ days: step });
    if (isBusinessDay(current)) amount -= 1;
  }

  return current;
};
