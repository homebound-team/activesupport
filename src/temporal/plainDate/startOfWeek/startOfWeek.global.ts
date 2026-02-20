import "src/temporal/types.global";
import { Temporal } from "temporal-polyfill";
import { startOfWeek } from "./startOfWeek.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns the start of a week for the date.
       * @param options An object with options
       * @returns The start of a week
       * @example Temporal.PlainDate.from("2014-09-02").startOfWeek() //=> 2014-08-31
       * @example // If the week starts on Monday: Temporal.PlainDate.from("2014-09-02").startOfWeek({ weekStartsOn: 1 }) //=> 2014-09-01
       */
      startOfWeek(options?: WeekOptions): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.startOfWeek = function (
  this: Temporal.PlainDate,
  options: Temporal.WeekOptions = {},
): Temporal.PlainDate {
  return startOfWeek(this, options);
};
