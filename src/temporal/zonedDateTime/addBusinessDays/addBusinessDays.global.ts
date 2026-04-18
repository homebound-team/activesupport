import "src/temporal/types.global";
import { Temporal } from "temporal-polyfill";
import { addBusinessDays } from "./addBusinessDays.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Adds the specified number of business days (mon - fri) to the ZonedDateTime, ignoring weekends.
       * @param amount The amount of business days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
       * @param options An object with options.
       * @param options.businessDays The business days. Default is Monday to Friday.
       * @param options.exceptions Exceptions to the business days. Map of date string to boolean.
       * @returns The new ZonedDateTime with the business days added
       * @example Temporal.ZonedDateTime.from("2014-09-01T00:00:00[UTC]").addBusinessDays(10) //=> 2014-09-15T00:00:00[UTC] (skipped weekend days)
       */
      addBusinessDays(amount: number, options?: BusinessDayOptions): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.addBusinessDays = function (
  this: Temporal.ZonedDateTime,
  amount: number,
  options: Temporal.BusinessDayOptions = {},
): Temporal.ZonedDateTime {
  return addBusinessDays(this, amount, options);
};
