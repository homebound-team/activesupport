import { Temporal } from "temporal-polyfill";
import { isBefore } from "./isBefore.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns true if the first date is before the second one.
       * @param other The date to compare with
       * @returns True if the first date is before the second date
       * @example Temporal.ZonedDateTime.from("1987-02-11T00:00:00[UTC]").isBefore(Temporal.ZonedDateTime.from("1989-07-10T00:00:00[UTC]")) //=> true
       */
      isBefore(other: Temporal.ZonedDateTime): boolean;
    }
  }
}

Temporal.ZonedDateTime.prototype.isBefore = function (
  this: Temporal.ZonedDateTime,
  other: Temporal.ZonedDateTime,
): boolean {
  return isBefore(this, other);
};
