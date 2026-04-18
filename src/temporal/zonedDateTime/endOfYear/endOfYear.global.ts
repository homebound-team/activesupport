import { Temporal } from "temporal-polyfill";
import { endOfYear } from "./endOfYear.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns the end of a year for the ZonedDateTime.
       * @returns The end of a year
       * @example Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]").endOfYear() //=> 2014-12-31T23:59:59.999+00:00[UTC]
       */
      endOfYear(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.endOfYear = function (this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return endOfYear(this);
};
