import { Temporal } from "temporal-polyfill";
import * as isDayOfWeek from "./isDayOfWeek.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Returns true if the PlainDate is Monday, false otherwise.
       * @returns True if the PlainDate is Monday
       * @example Temporal.PlainDate.from("2014-09-22").isMonday //=> true
       * @example Temporal.PlainDate.from("2014-09-23").isMonday //=> false
       */
      readonly isMonday: boolean;
      /**
       * Returns true if the PlainDate is Tuesday, false otherwise.
       * @returns True if the PlainDate is Tuesday
       * @example Temporal.PlainDate.from("2014-09-23").isTuesday //=> true
       * @example Temporal.PlainDate.from("2014-09-22").isTuesday //=> false
       */
      readonly isTuesday: boolean;
      /**
       * Returns true if the PlainDate is Wednesday, false otherwise.
       * @returns True if the PlainDate is Wednesday
       * @example Temporal.PlainDate.from("2014-09-24").isWednesday //=> true
       * @example Temporal.PlainDate.from("2014-09-23").isWednesday //=> false
       */
      readonly isWednesday: boolean;
      /**
       * Returns true if the PlainDate is Thursday, false otherwise.
       * @returns True if the PlainDate is Thursday
       * @example Temporal.PlainDate.from("2014-09-25").isThursday //=> true
       * @example Temporal.PlainDate.from("2014-09-24").isThursday //=> false
       */
      readonly isThursday: boolean;
      /**
       * Returns true if the PlainDate is Friday, false otherwise.
       * @returns True if the PlainDate is Friday
       * @example Temporal.PlainDate.from("2014-09-26").isFriday //=> true
       * @example Temporal.PlainDate.from("2014-09-25").isFriday //=> false
       */
      readonly isFriday: boolean;
      /**
       * Returns true if the PlainDate is Saturday, false otherwise.
       * @returns True if the PlainDate is Saturday
       * @example Temporal.PlainDate.from("2014-09-27").isSaturday //=> true
       * @example Temporal.PlainDate.from("2014-09-26").isSaturday //=> false
       */
      readonly isSaturday: boolean;
      /**
       * Returns true if the PlainDate is Sunday, false otherwise.
       * @returns True if the PlainDate is Sunday
       * @example Temporal.PlainDate.from("2014-09-28").isSunday //=> true
       * @example Temporal.PlainDate.from("2014-09-27").isSunday //=> false
       */
      readonly isSunday: boolean;
    }
  }
}

Object.entries(isDayOfWeek).forEach(([name, impl]) =>
  Object.defineProperty(Temporal.PlainDate.prototype, name, {
    enumerable: false,
    get: function (this: Temporal.PlainDate) {
      return impl(this);
    },
  }),
);
