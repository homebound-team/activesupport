import { Temporal } from "temporal-polyfill";
import { endOfMonth } from "./endOfMonth.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns the end of a month for the PlainDate.
       * @returns The end of a month
       * @example Temporal.PlainDate.from("2014-09-02").endOfMonth() //=> "2014-09-30"
       */
      endOfMonth(): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.endOfMonth = function (this: Temporal.PlainDate): Temporal.PlainDate {
  return endOfMonth(this);
};
