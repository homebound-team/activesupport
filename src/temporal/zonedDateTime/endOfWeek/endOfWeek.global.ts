import "src/temporal/types.global";
import { Temporal } from "temporal-polyfill";
import { endOfWeek } from "./endOfWeek.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns the end of a week for the date.
       * @param options An object with options
       * @returns The end of a week
       * @example Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]").endOfWeek() //=> 2014-09-06T23:59:59.999+00:00[UTC]
       * @example // If the week starts on Monday: Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]").endOfWeek({ weekStartsOn: 1 }) //=> 2014-09-07T23:59:59.999+00:00[UTC]
       */
      endOfWeek(options?: WeekOptions): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.endOfWeek = function (
  this: Temporal.ZonedDateTime,
  options: Temporal.WeekOptions = {},
): Temporal.ZonedDateTime {
  return endOfWeek(this, options);
};
