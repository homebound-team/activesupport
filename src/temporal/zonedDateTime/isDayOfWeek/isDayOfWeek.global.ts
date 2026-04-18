import { Temporal } from "temporal-polyfill";
import * as isDayOfWeek from "./isDayOfWeek.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Returns true if the ZonedDateTime is Monday, false otherwise.
       * @returns True if the ZonedDateTime is Monday
       * @example Temporal.ZonedDateTime.from("2014-09-22T00:00:00.000+00:00[UTC]").isMonday //=> true
       * @example Temporal.ZonedDateTime.from("2014-09-23T00:00:00.000+00:00[UTC]").isMonday //=> false
       */
      readonly isMonday: boolean;
      /**
       * Returns true if the ZonedDateTime is Tuesday, false otherwise.
       * @returns True if the ZonedDateTime is Tuesday
       * @example Temporal.ZonedDateTime.from("2014-09-23T00:00:00.000+00:00[UTC]").isTuesday //=> true
       * @example Temporal.ZonedDateTime.from("2014-09-22T00:00:00.000+00:00[UTC]").isTuesday //=> false
       */
      readonly isTuesday: boolean;
      /**
       * Returns true if the ZonedDateTime is Wednesday, false otherwise.
       * @returns True if the ZonedDateTime is Wednesday
       * @example Temporal.ZonedDateTime.from("2014-09-24T00:00:00.000+00:00[UTC]").isWednesday //=> true
       * @example Temporal.ZonedDateTime.from("2014-09-23T00:00:00.000+00:00[UTC]").isWednesday //=> false
       */
      readonly isWednesday: boolean;
      /**
       * Returns true if the ZonedDateTime is Thursday, false otherwise.
       * @returns True if the ZonedDateTime is Thursday
       * @example Temporal.ZonedDateTime.from("2014-09-25T00:00:00.000+00:00[UTC]").isThursday //=> true
       * @example Temporal.ZonedDateTime.from("2014-09-24T00:00:00.000+00:00[UTC]").isThursday //=> false
       */
      readonly isThursday: boolean;
      /**
       * Returns true if the ZonedDateTime is Friday, false otherwise.
       * @returns True if the ZonedDateTime is Friday
       * @example Temporal.ZonedDateTime.from("2014-09-26T00:00:00.000+00:00[UTC]").isFriday //=> true
       * @example Temporal.ZonedDateTime.from("2014-09-25T00:00:00.000+00:00[UTC]").isFriday //=> false
       */
      readonly isFriday: boolean;
      /**
       * Returns true if the ZonedDateTime is Saturday, false otherwise.
       * @returns True if the ZonedDateTime is Saturday
       * @example Temporal.ZonedDateTime.from("2014-09-27T00:00:00.000+00:00[UTC]").isSaturday //=> true
       * @example Temporal.ZonedDateTime.from("2014-09-26T00:00:00.000+00:00[UTC]").isSaturday //=> false
       */
      readonly isSaturday: boolean;
      /**
       * Returns true if the ZonedDateTime is Sunday, false otherwise.
       * @returns True if the ZonedDateTime is Sunday
       * @example Temporal.ZonedDateTime.from("2014-09-28T00:00:00.000+00:00[UTC]").isSunday //=> true
       * @example Temporal.ZonedDateTime.from("2014-09-27T00:00:00.000+00:00[UTC]").isSunday //=> false
       */
      readonly isSunday: boolean;
    }
  }
}

Object.entries(isDayOfWeek).forEach(([name, impl]) =>
  Object.defineProperty(Temporal.ZonedDateTime.prototype, name, {
    enumerable: false,
    get: function (this: Temporal.ZonedDateTime) {
      return impl(this);
    },
  }),
);
