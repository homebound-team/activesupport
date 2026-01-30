import { Temporal } from "temporal-polyfill";
import { toIntervalImpl } from "./toInterval.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
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
      toInterval(end: Temporal.PlainDate): Temporal.Interval<Temporal.PlainDate>;
    }
  }
}

Temporal.PlainDate.prototype.toInterval = toIntervalImpl;
