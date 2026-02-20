import "src/temporal/interval/interval.global";
import { Temporal } from "temporal-polyfill";
import { toInterval } from "./toInterval.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns an interval between the given dates.
       * @param end The end of the interval
       * @returns An Interval from start to end
       * @example Temporal.ZonedDateTime.from("2024-01-01T00:00:00[UTC]").toInterval(Temporal.ZonedDateTime.from("2024-01-31T00:00:00[UTC]")) //=> Interval { start: 2024-01-01T00:00:00+00:00[UTC], end: 2024-01-31T00:00:00+00:00[UTC] }
       */
      toInterval(end: Temporal.ZonedDateTime): Interval<Temporal.ZonedDateTime>;
    }
  }
}

Temporal.ZonedDateTime.prototype.toInterval = function (
  this: Temporal.ZonedDateTime,
  end: Temporal.ZonedDateTime,
): Temporal.Interval<Temporal.ZonedDateTime> {
  return toInterval(this, end);
};
