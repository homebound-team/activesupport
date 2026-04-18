import { Temporal } from "temporal-polyfill";
import { startOfYear } from "./startOfYear.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns the start of a year for the ZonedDateTime.
       * @returns The start of a year
       * @example Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]").startOfYear() //=> 2014-01-01T00:00:00+00:00[UTC]
       */
      startOfYear(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.startOfYear = function (this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return startOfYear(this);
};
