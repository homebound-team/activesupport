import { Temporal } from "temporal-polyfill";
import { endOfYear } from "./endOfYear.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns the end of a year for the PlainDate.
       * @returns The end of a year
       * @example Temporal.PlainDate.from("2014-09-02").endOfYear() //=> 2014-12-31
       */
      endOfYear(): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.endOfYear = function (this: Temporal.PlainDate): Temporal.PlainDate {
  return endOfYear(this);
};
