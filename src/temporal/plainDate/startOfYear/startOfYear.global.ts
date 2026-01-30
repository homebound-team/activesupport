import { Temporal } from "temporal-polyfill";
import { startOfYearImpl } from "./startOfYear.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * @name startOfYear
       * @category Year Helpers
       * @summary Return the start of a year for the given date.
       *
       * @description
       * Return the start of a year for the given date.
       *
       * @returns The start of a year
       *
       * @example
       * // The start of a year for 2 September 2014
       * const result = Temporal.PlainDate.from("2014-09-02").startOfYear()
       * //=> 2014-01-01
       */
      startOfYear(): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.startOfYear = startOfYearImpl;
