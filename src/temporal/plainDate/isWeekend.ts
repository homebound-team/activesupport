import { Temporal } from "temporal-polyfill";
import { withValidBusinessDays } from "../../index";

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
      isWeekend(options?: { businessDays?: number[] }): boolean;
    }
  }
}

Temporal.PlainDate.prototype.isWeekend = function (options: { businessDays?: number[] } = {}) {
  const { businessDays } = withValidBusinessDays(options);
  return !businessDays.includes(this.dayOfWeek);
};
