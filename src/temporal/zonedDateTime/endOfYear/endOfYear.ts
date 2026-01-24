import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name endOfYear
       * @category Year Helpers
       * @summary Return the end of a year for the given date.
       *
       * @description
       * Return the end of a year for the given date.
       *
       * @returns The end of a year
       *
       * @example
       * // The end of a year for 2 September 2014 11:55:00:
       * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
       * //=> Wed Dec 31 2014 23:59:59.999
       */
      endOfYear(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.endOfYear = function (): Temporal.ZonedDateTime {
  return this.with({ month: this.monthsInYear }).endOfMonth();
};
