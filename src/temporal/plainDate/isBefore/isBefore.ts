import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * @name isBefore
       * @category Common Helpers
       * @summary Is the first date before the second one?
       *
       * @description
       * Is the first date before the second one?
       *
       * @param other - The date to compare with
       *
       * @returns The first date is before the second date
       *
       * @example
       * // Is 11 February 1987 before 10 July 1989?
       * const result = Temporal.PlainDate.from("1987-02-11").isBefore(Temporal.PlainDate.from("1989-07-10"))
       * //=> true
       */
      isBefore(other: Temporal.PlainDate): boolean;
    }
  }
}

Temporal.PlainDate.prototype.isBefore = function (other) {
  return Temporal.PlainDate.compare(this, other) === -1;
};
