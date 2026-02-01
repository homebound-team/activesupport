import { Temporal } from "temporal-polyfill";
import { startOfMonth } from "./startOfMonth.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name startOfMonth
       * @category Month Helpers
       * @summary Return the start of a month for the given date.
       *
       * @description
       * Return the start of a month for the given date.
       *
       * @returns The start of a month
       *
       * @example
       * // The start of a month for 2 September 2014
       * const result = Temporal.ZonedDateTime.from("2014-09-02").startOfMonth()
       * //=> 2014-09-01
       */
      startOfMonth(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.startOfMonth = function (this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return startOfMonth(this);
};
