import { Temporal } from "temporal-polyfill";
import { isAfter } from "./isAfter.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns true if the first date is after the second one.
       * @param other The date to compare with
       * @returns True if the first date is after the second date
       * @example Temporal.ZonedDateTime.from("1989-07-10T00:00:00[UTC]").isAfter(Temporal.ZonedDateTime.from("1987-02-11T00:00:00[UTC]")) //=> true
       */
      isAfter(other: Temporal.ZonedDateTime): boolean;
    }
  }
}

Temporal.ZonedDateTime.prototype.isAfter = function (
  this: Temporal.ZonedDateTime,
  other: Temporal.ZonedDateTime,
): boolean {
  return isAfter(this, other);
};
