import "src/temporal/types.global";
import { Temporal } from "temporal-polyfill";
import { differenceInBusinessDays } from "./differenceInBusinessDays.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns the number of business day periods between two dates.
       * Business days being days that aren't in the weekend.
       * The function removes the times from the dates before calculating the difference.
       * @param other The earlier date
       * @param options An object with options.
       * @param options.businessDays The business days. Default is Monday to Friday.
       * @param options.exceptions Exceptions to the business days. Map of date string to boolean.
       * @returns The number of business days
       * @example Temporal.ZonedDateTime.from("2014-07-20T00:00:00[UTC]").differenceInBusinessDays(Temporal.ZonedDateTime.from("2014-01-10T00:00:00[UTC]")) //=> 136
       */
      differenceInBusinessDays(other: Temporal.ZonedDateTime, options?: BusinessDayOptions): number;
    }
  }
}

Temporal.ZonedDateTime.prototype.differenceInBusinessDays = function (
  this: Temporal.ZonedDateTime,
  other: Temporal.ZonedDateTime,
  options: Temporal.BusinessDayOptions = {},
): number {
  return differenceInBusinessDays(this, other, options);
};
