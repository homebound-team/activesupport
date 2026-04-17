import "src/temporal/interval/interval.global";
import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";
import { isWithin } from "./isWithin.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns true if the PlainDate is within the interval. (Including start and end.)
       * @param interval The interval to check against
       * @returns True if the PlainDate is within the interval
       * @example Temporal.PlainDate.from("2014-01-03").isWithin(Interval.from(Temporal.PlainDate.from("2014-01-01"), Temporal.PlainDate.from("2014-01-07"))) //=> true
       * @example Temporal.PlainDate.from("2014-01-10").isWithin(Interval.from(Temporal.PlainDate.from("2014-01-01"), Temporal.PlainDate.from("2014-01-07"))) //=> false
       */
      isWithin(interval: Interval<Temporal.PlainDate>): boolean;
    }
  }
}

Temporal.PlainDate.prototype.isWithin = function (
  this: Temporal.PlainDate,
  interval: Temporal.Interval<Temporal.PlainDate>,
): boolean {
  return isWithin(this, interval as Interval<Temporal.PlainDate>);
};
