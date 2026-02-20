import "src/temporal/interval/interval.global";
import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";
import { isWithin } from "./isWithin.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns true if the date is within the interval. (Including start and end.)
       * @param interval The interval to check against
       * @returns True if the date is within the interval
       * @example Temporal.ZonedDateTime.from("2014-01-03T00:00:00[UTC]").isWithin(Interval.from(Temporal.ZonedDateTime.from("2014-01-01T00:00:00[UTC]"), Temporal.ZonedDateTime.from("2014-01-07T00:00:00[UTC]"))) //=> true
       * @example Temporal.ZonedDateTime.from("2014-01-10T00:00:00[UTC]").isWithin(Interval.from(Temporal.ZonedDateTime.from("2014-01-01T00:00:00[UTC]"), Temporal.ZonedDateTime.from("2014-01-07T00:00:00[UTC]"))) //=> false
       */
      isWithin(interval: Interval<Temporal.ZonedDateTime>): boolean;
    }
  }
}

Temporal.ZonedDateTime.prototype.isWithin = function (
  this: Temporal.ZonedDateTime,
  interval: Temporal.Interval<Temporal.ZonedDateTime>,
): boolean {
  return isWithin(this, interval as Interval<Temporal.ZonedDateTime>);
};
