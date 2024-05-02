import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * @name endOfYear
       * @category Year Helpers
       * @summary Return the end of a year for the given date.
       *
       * @description
       * Return the end of a year for the given date.
       * The result will be in the local timezone.
       *
       * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
       *
       * @param date - The original date
       *
       * @returns The end of a year
       *
       * @example
       * // The end of a year for 2 September 2014 11:55:00:
       * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
       * //=> Wed Dec 31 2014 23:59:59.999
       */
      endOfYear(): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.endOfYear = function (): Temporal.PlainDate {
  const current = this.with({ month: this.monthsInYear });
  return current.with({ day: current.daysInMonth });
};
