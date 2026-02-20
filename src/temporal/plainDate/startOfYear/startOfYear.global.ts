import { Temporal } from "temporal-polyfill";
import { startOfYear } from "./startOfYear.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns the start of a year for the date.
       * @returns The start of a year
       * @example Temporal.PlainDate.from("2014-09-02").startOfYear() //=> 2014-01-01
       */
      startOfYear(): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.startOfYear = function (this: Temporal.PlainDate): Temporal.PlainDate {
  return startOfYear(this);
};
