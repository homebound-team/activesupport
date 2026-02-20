import { Temporal } from "temporal-polyfill";
import { startOfMonth } from "./startOfMonth.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns the start of a month for the date.
       * @returns The start of a month
       * @example Temporal.PlainDate.from("2014-09-02").startOfMonth() //=> 2014-09-01
       */
      startOfMonth(): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.startOfMonth = function (this: Temporal.PlainDate): Temporal.PlainDate {
  return startOfMonth(this);
};
