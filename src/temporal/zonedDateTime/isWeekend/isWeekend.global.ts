import { DayOfWeek } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";
import { isWeekend } from "./isWeekend.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns true if the ZonedDateTime falls on a weekend.
       * @param options An object with options
       * @returns True if the ZonedDateTime falls on a weekend
       * @example Temporal.ZonedDateTime.from("2014-10-05T00:00:00[UTC]").isWeekend() //=> true
       * @example // With custom business days: Temporal.ZonedDateTime.from("2014-10-05T00:00:00[UTC]").isWeekend({ businessDays: [6,7] }) //=> false
       */
      isWeekend(options?: { businessDays?: DayOfWeek[] }): boolean;
    }
  }
}

Temporal.ZonedDateTime.prototype.isWeekend = function (
  this: Temporal.ZonedDateTime,
  options: { businessDays?: DayOfWeek[] } = {},
): boolean {
  return isWeekend(this, options);
};
