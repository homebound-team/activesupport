import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
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
       * @returns The first date is after the second date
       *
       * @example
       * // Is 11 February 1987 after 10 July 1989?
       * const result = Temporal.ZonedDateTime.from("1987-02-11").isBefore(Temporal.ZonedDateTime.from("1989-07-10"))
       * //=> true
       */
      isBefore(other: Temporal.ZonedDateTime): boolean;
    }
  }
}

Temporal.ZonedDateTime.prototype.isBefore = function (other) {
  return Temporal.ZonedDateTime.compare(this, other) === -1;
};
