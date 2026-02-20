import "src/temporal/types.global";
import { Temporal } from "temporal-polyfill";
import { isWeekend } from "./isWeekend.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns true if the date falls on a weekend.
       * @param options An object with options
       * @returns True if the date falls on a weekend
       * @example Temporal.PlainDate.from("2014-10-05").isWeekend() //=> true
       * @example // With custom business days: Temporal.PlainDate.from("2014-10-05").isWeekend({ businessDays: [6,7] }) //=> false
       */
      isWeekend(options?: BusinessDayOptions): boolean;
    }
  }
}

Temporal.PlainDate.prototype.isWeekend = function (
  this: Temporal.PlainDate,
  options: Temporal.BusinessDayOptions = {},
): boolean {
  return isWeekend(this, options);
};
