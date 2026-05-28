import { startOfYear } from "./startOfYear.impl";

declare global {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns the start of a year for the PlainDate.
       * @returns The start of a year
       * @example Temporal.PlainDate.from("2014-09-02").startOfYear() //=> 2014-01-01
       */
      startOfYear(): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.startOfYear = function (this: Temporal.PlainDate): Temporal.PlainDate {
  return startOfYear(this);
};
