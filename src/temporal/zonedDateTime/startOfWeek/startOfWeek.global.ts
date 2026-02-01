import { Temporal } from "temporal-polyfill";
import { startOfWeek } from "./startOfWeek.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name startOfWeek
       * @category Week Helpers
       * @summary Return the start of a week for the given date.
       *
       * @description
       * Return the start of a week for the given date.
       *
       * @param options - An object with options
       *
       * @returns The start of a week
       *
       * @example
       * // The start of a week for 2 September 2014:
       * const result = Temporal.ZonedDateTime.from("2014-09-02").startOfWeek()
       * //=> 2014-08-31
       *
       * @example
       * // If the week starts on Monday, the start of the week for 2 September 2014:
       * const result = Temporal.ZonedDateTime.from("2014-09-02").startOfWeek({ weekStartsOn: 1 })
       * //=> 2014-09-01
       */
      startOfWeek(options?: { weekStartsOn?: number }): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.startOfWeek = function (
  this: Temporal.ZonedDateTime,
  options?: { weekStartsOn?: number },
): Temporal.ZonedDateTime {
  return startOfWeek(this, options);
};
