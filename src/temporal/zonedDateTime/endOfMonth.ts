import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name endOfMonth
       * @category Month Helpers
       * @summary Return the end of a month for the given date.
       *
       * @description
       * Return the end of a month for the given date.
       *
       * @returns The end of a month
       *
       * @example
       * // The end of a month for 2 September 2014
       * const result = Temporal.ZonedDateTime.from("2014-09-02").endOfMonth()
       * //=> "2014-09-30"
       */
      endOfMonth(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.endOfMonth = function () {
  return this.with({ day: this.daysInMonth }).endOfDay();
};
