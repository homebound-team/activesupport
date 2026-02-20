import "src/temporal/types.global";
import { Temporal } from "temporal-polyfill";
import { endOfWeek } from "./endOfWeek.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns the end of a week for the date.
       * @param options An object with options
       * @returns The end of a week
       * @example Temporal.PlainDate.from("2014-09-02").endOfWeek() //=> 2014-09-06
       * @example // If the week starts on Monday: Temporal.PlainDate.from("2014-09-02").endOfWeek({ weekStartsOn: 1 }) //=> 2014-09-07
       */
      endOfWeek(options?: WeekOptions): Temporal.PlainDate;
    }
  }
}

Temporal.PlainDate.prototype.endOfWeek = function (
  this: Temporal.PlainDate,
  options: Temporal.WeekOptions = {},
): Temporal.PlainDate {
  return endOfWeek(this, options);
};
