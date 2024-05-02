import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name isAfter
       * @category Common Helpers
       * @summary Is the first date after the second one?
       *
       * @description
       * Is the first date after the second one?
       *
       * @param other - The date to compare with
       *
       * @returns The first date is after the second date
       *
       * @example
       * // Is 10 July 1989 after 11 February 1987?
       * const result = Temporal.ZonedDateTime.from("1989-07-10").isAfter(Temporal.ZonedDateTime.from("1987-02-11"))
       * //=> true
       */
      isAfter(other: Temporal.ZonedDateTime): boolean;
    }
  }
}

Temporal.ZonedDateTime.prototype.isAfter = function (other) {
  return Temporal.ZonedDateTime.compare(this, other) === 1;
};