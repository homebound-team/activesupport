import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name endOfDay
       * @category Day Helpers
       * @summary Return the end of a day for the given date.
       *
       * @description
       * Return the end of a day for the given date.
       *
       * @returns The end of a day
       *
       * @example
       * // The end of a day for 2 September 2014 11:55:00 UTC:
       * const result = Temporal.ZonedDateTime.from("2024-09-02T11:55:00.000+00:00[UTC]").endOfDay()
       * //=> Tue Sep 02 2014 23:59:59.999
       */
      endOfDay(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.endOfDay = function () {
  // TODO: update this for micro and nano seconds once available
  return this.with({ hour: 23, minute: 59, second: 59, millisecond: 999 });
};
