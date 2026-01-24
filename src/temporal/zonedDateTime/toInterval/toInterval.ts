import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name toInterval
       * @category Interval Helpers
       * @summary returns an interval between the gives dates
       *
       * @param end the end of the interval
       *
       * @description
       * Returns an interval between the gives dates
       *
       * @returns Temporal.Interval
       */
      toInterval(end: Temporal.ZonedDateTime): Temporal.Interval<Temporal.ZonedDateTime>;
    }
  }
}

Temporal.ZonedDateTime.prototype.toInterval = function (
  end: Temporal.ZonedDateTime,
): Temporal.Interval<Temporal.ZonedDateTime> {
  return Temporal.Interval.from(this, end);
};
