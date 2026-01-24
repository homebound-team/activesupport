import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * @name startOfMonth
       * @category Month Helpers
       * @summary Return the start of a month for the given date.
       *
       * @description
       * Return the start of a month for the given date.
       *
       * @returns The start of a month
       *
       * @example
       * // The start of a month for 2 September 2014
       * const result = Temporal.PlainDate.from("2014-09-02").startOfMonth()
       * //=> 2014-09-01
       */
      startOfMonth(): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.startOfMonth = function (): Temporal.PlainDate {
  return this.with({ day: 1 });
};
