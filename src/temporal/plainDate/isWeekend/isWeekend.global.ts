import { BusinessDayOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";
import { isWeekend } from "./isWeekend.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * @name isWeekend
       * @category Weekday Helpers
       * @summary Does the given date fall on a weekend?
       *
       * @description
       * Does the given date fall on a weekend?
       *
       * @param options - An object with options
       *
       * @returns The date falls on a weekend
       *
       * @example
       * // Does 5 October 2014 fall on a weekend?
       * const result = Temporal.PlainDate.from("2014-10-05").isWeekend()
       * //=> true
       *
       * @example
       * // Does 5 October 2014 fall on a weekend with inverted weekdays?
       * const result = Temporal.PlainDate.from("2014-10-05").isWeekend({ businessDays: [6,7] })
       * //=> false
       */
      isWeekend(options?: BusinessDayOptions): boolean;
    }
  }
}

Temporal.PlainDate.prototype.isWeekend = function (this: Temporal.PlainDate, options?: BusinessDayOptions): boolean {
  return isWeekend(this, options);
};
