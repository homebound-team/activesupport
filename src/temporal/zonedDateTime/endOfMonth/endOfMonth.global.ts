import { Temporal } from "temporal-polyfill";
import { endOfMonth } from "./endOfMonth.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns the end of a month for the date.
       * @returns The end of a month
       * @example Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]").endOfMonth() //=> 2014-09-30T23:59:59.999+00:00[UTC]
       */
      endOfMonth(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.endOfMonth = function (this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return endOfMonth(this);
};
