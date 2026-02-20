import "src/temporal/types.global";
import { Temporal } from "temporal-polyfill";
import { differenceInBusinessDays } from "./differenceInBusinessDays.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns the number of business day periods between two dates.
       * Business days being days that aren't in the weekend.
       * @param other The earlier date
       * @param options An object with options.
       * @param options.businessDays The business days. Default is Monday to Friday.
       * @param options.exceptions Exceptions to the business days. Map of date string to boolean.
       * @returns The number of business days
       * @example Temporal.PlainDate.from("2014-07-20").differenceInBusinessDays(Temporal.PlainDate.from("2014-01-10")) //=> 136
       */
      differenceInBusinessDays(other: Temporal.PlainDate, options?: BusinessDayOptions): number;
    }
  }
}

Temporal.PlainDate.prototype.differenceInBusinessDays = function (
  this: Temporal.PlainDate,
  other: Temporal.PlainDate,
  options: Temporal.BusinessDayOptions = {},
): number {
  return differenceInBusinessDays(this, other, options);
};
