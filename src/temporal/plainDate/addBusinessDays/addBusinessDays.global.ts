import "src/temporal/types.global";
import { Temporal } from "temporal-polyfill";
import { addBusinessDays } from "./addBusinessDays.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Adds the specified number of business days (mon - fri) to the PlainDate, ignoring weekends.
       * @param amount The amount of business days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
       * @param options An object with options.
       * @param options.businessDays The business days. Default is Monday to Friday.
       * @param options.exceptions Exceptions to the business days. Map of date string to boolean.
       * @returns The new PlainDate with the business days added
       * @example Temporal.PlainDate.from("2014-09-01").addBusinessDays(10) //=> Mon Sep 15 2014 (skipped weekend days)
       */
      addBusinessDays(amount: number, options?: BusinessDayOptions): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.addBusinessDays = function (
  this: Temporal.PlainDate,
  amount: number,
  options: Temporal.BusinessDayOptions = {},
): Temporal.PlainDate {
  return addBusinessDays(this, amount, options);
};
