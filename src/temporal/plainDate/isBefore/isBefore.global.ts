import { Temporal } from "temporal-polyfill";
import { isBefore } from "./isBefore.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns true if the first PlainDate is before the second one.
       * @param other The PlainDate to compare with
       * @returns True if the first PlainDate is before the second PlainDate
       * @example Temporal.PlainDate.from("1987-02-11").isBefore(Temporal.PlainDate.from("1989-07-10")) //=> true
       */
      isBefore(other: Temporal.PlainDate): boolean;
    }
  }
}

Temporal.PlainDate.prototype.isBefore = function (this: Temporal.PlainDate, other: Temporal.PlainDate): boolean {
  return isBefore(this, other);
};
