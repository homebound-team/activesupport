import "src/temporal/interval/interval.global";
import { Temporal } from "temporal-polyfill";
import { toInterval } from "./toInterval.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns an interval between the given dates.
       * @param end The end of the interval
       * @returns An Interval from start to end
       * @example Temporal.PlainDate.from("2024-01-01").toInterval(Temporal.PlainDate.from("2024-01-31")) //=> Interval { start: 2024-01-01, end: 2024-01-31 }
       */
      toInterval(end: Temporal.PlainDate): Interval<Temporal.PlainDate>;
    }
  }
}

Temporal.PlainDate.prototype.toInterval = function (
  this: Temporal.PlainDate,
  end: Temporal.PlainDate,
): Temporal.Interval<Temporal.PlainDate> {
  return toInterval(this, end);
};
