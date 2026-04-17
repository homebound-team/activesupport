import { Temporal } from "temporal-polyfill";
import { startOfMonth } from "./startOfMonth.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns the start of a month for the ZonedDateTime.
       * @returns The start of a month
       * @example Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]").startOfMonth() //=> 2014-09-01T00:00:00+00:00[UTC]
       */
      startOfMonth(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.startOfMonth = function (this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return startOfMonth(this);
};
