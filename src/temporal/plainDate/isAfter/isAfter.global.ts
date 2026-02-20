import { Temporal } from "temporal-polyfill";
import { isAfter } from "./isAfter.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns true if the first date is after the second one.
       * @param other The date to compare with
       * @returns True if the first date is after the second date
       * @example Temporal.PlainDate.from("1989-07-10").isAfter(Temporal.PlainDate.from("1987-02-11")) //=> true
       */
      isAfter(other: Temporal.PlainDate): boolean;
    }
  }
}

Temporal.PlainDate.prototype.isAfter = function (this: Temporal.PlainDate, other: Temporal.PlainDate): boolean {
  return isAfter(this, other);
};
