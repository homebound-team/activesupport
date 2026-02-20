import "src/temporal/types.global";
import { Temporal } from "temporal-polyfill";
import { startOfWeek } from "./startOfWeek.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns the start of a week for the date.
       * @param options An object with options
       * @returns The start of a week
       * @example Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]").startOfWeek() //=> 2014-08-31T00:00:00+00:00[UTC]
       * @example // If the week starts on Monday: Temporal.ZonedDateTime.from("2014-09-02T00:00:00[UTC]").startOfWeek({ weekStartsOn: 1 }) //=> 2014-09-01T00:00:00+00:00[UTC]
       */
      startOfWeek(options?: WeekOptions): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.startOfWeek = function (
  this: Temporal.ZonedDateTime,
  options: Temporal.WeekOptions = {},
): Temporal.ZonedDateTime {
  return startOfWeek(this, options);
};
