import { Temporal } from "temporal-polyfill";
import {
  isFridayImpl,
  isMondayImpl,
  isSaturdayImpl,
  isSundayImpl,
  isThursdayImpl,
  isTuesdayImpl,
  isWednesdayImpl,
} from "./isDayOfWeek.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name isMonday
       * @category Weekday Helpers
       * @summary Is the given date Monday?
       *
       * @description
       * Is the given date Monday?
       *
       * @returns The date is Monday
       *
       * @example
       * // Is 22 September 2014 Monday?
       * const result = Temporal.ZonedDateTime.from("2014-09-22").isMonday
       * //=> true
       */
      get isMonday(): boolean;
      /**
       * @name isTuesday
       * @category Weekday Helpers
       * @summary Is the given date Tuesday?
       *
       * @description
       * Is the given date Tuesday?
       *
       * @returns The date is Tuesday
       *
       * @example
       * // Is 23 September 2014 Tuesday?
       * const result = Temporal.ZonedDateTime.from("2014-09-23").isTuesday
       * //=> true
       */
      get isTuesday(): boolean;
      /**
       * @name isWednesday
       * @category Weekday Helpers
       * @summary Is the given date Wednesday?
       *
       * @description
       * Is the given date Wednesday?
       *
       * @returns The date is Wednesday
       *
       * @example
       * // Is 24 September 2014 Wednesday?
       * const result = Temporal.ZonedDateTime.from("2014-09-24").isWednesday
       * //=> true
       */
      get isWednesday(): boolean;
      /**
       * @name isThursday
       * @category Weekday Helpers
       * @summary Is the given date Thursday?
       *
       * @description
       * Is the given date Thursday?
       *
       * @returns The date is Thursday
       *
       * @example
       * // Is 25 September 2014 Thursday?
       * const result = Temporal.ZonedDateTime.from("2014-09-25").isThursday
       * //=> true
       */
      get isThursday(): boolean;
      /**
       * @name isFriday
       * @category Weekday Helpers
       * @summary Is the given date Friday?
       *
       * @description
       * Is the given date Friday?
       *
       * @returns The date is Friday
       *
       * @example
       * // Is 26 September 2014 Friday?
       * const result = Temporal.ZonedDateTime.from("2014-09-26").isFriday
       * //=> true
       */
      get isFriday(): boolean;
      /**
       * @name isSaturday
       * @category Weekday Helpers
       * @summary Is the given date Saturday?
       *
       * @description
       * Is the given date Saturday?
       *
       * @returns The date is Saturday
       *
       * @example
       * // Is 27 September 2014 Saturday?
       * const result = Temporal.ZonedDateTime.from("2014-09-27").isSaturday
       * //=> true
       */
      get isSaturday(): boolean;
      /**
       * @name isSunday
       * @category Weekday Helpers
       * @summary Is the given date Sunday?
       *
       * @description
       * Is the given date Sunday?
       *
       * @returns The date is Sunday
       *
       * @example
       * // Is 28 September 2014 Sunday?
       * const result = Temporal.ZonedDateTime.from("2014-09-28").isSunday
       * //=> true
       */
      get isSunday(): boolean;
    }
  }
}

Object.defineProperty(Temporal.ZonedDateTime.prototype, "isMonday", {
  enumerable: false,
  get: isMondayImpl,
});

Object.defineProperty(Temporal.ZonedDateTime.prototype, "isTuesday", {
  enumerable: false,
  get: isTuesdayImpl,
});

Object.defineProperty(Temporal.ZonedDateTime.prototype, "isWednesday", {
  enumerable: false,
  get: isWednesdayImpl,
});

Object.defineProperty(Temporal.ZonedDateTime.prototype, "isThursday", {
  enumerable: false,
  get: isThursdayImpl,
});

Object.defineProperty(Temporal.ZonedDateTime.prototype, "isFriday", {
  enumerable: false,
  get: isFridayImpl,
});

Object.defineProperty(Temporal.ZonedDateTime.prototype, "isSaturday", {
  enumerable: false,
  get: isSaturdayImpl,
});

Object.defineProperty(Temporal.ZonedDateTime.prototype, "isSunday", {
  enumerable: false,
  get: isSundayImpl,
});
