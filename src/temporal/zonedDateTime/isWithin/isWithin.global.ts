import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name isWithin
       * @category Interval Helpers
       * @summary Is the given date within the interval?
       *
       * @description
       * Is the given date within the interval? (Including start and end.)
       *
       * @param interval - The interval to check
       *
       * @returns The date is within the interval
       *
       * @example
       * // For the date within the interval:
       * Temporal.ZonedDateTime.from("2014-01-03").isWithin(
       *  Temporal.ZonedDateTime.Interval.from(
       *   Temporal.ZonedDateTime.from("2014-01-01"),
       *   Temporal.ZonedDateTime.from("2014-01-07")
       *  )
       * })
       * //=> true
       *
       * @example
       * // For the date outside of the interval:
       * Temporal.ZonedDateTime.from("2014-01-10").isWithin(
       *  Temporal.ZonedDateTime.Interval.from(
       *   Temporal.ZonedDateTime.from("2014-01-01"),
       *   Temporal.ZonedDateTime.from("2014-01-07")
       *  )
       * })
       * //=> false
       *
       * @example
       * // For date equal to interval start:
       * const start = Temporal.ZonedDateTime.from("2014-01-10")
       * start.isWithin(Temporal.ZonedDateTime.Interval.from(start, ...))
       * // => true
       *
       * @example
       * // For date equal to interval end:
       * const end = Temporal.ZonedDateTime.from("2014-01-10")
       * end.isWithin(Temporal.ZonedDateTime.Interval.from(..., end))
       * // => true
       */
      isWithin(interval: Temporal.Interval<Temporal.ZonedDateTime>): boolean;
    }
  }
}

Temporal.ZonedDateTime.prototype.isWithin = function (interval: Temporal.Interval<Temporal.ZonedDateTime>) {
  return interval.contains(this);
};
