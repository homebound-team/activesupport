import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name endOfWeek
       * @category Week Helpers
       * @summary Return the end of a week for the given date.
       *
       * @description
       * Return the end of a week for the given date.
       *
       * @param options - An object with options
       *
       * @returns The end of a week
       *
       * @example
       * // The end of a week for 2 September 2014:
       * const result = Temporal.ZonedDateTime.from("2014-09-02").endOfWeek()
       * //=> 2014-09-06
       *
       * @example
       * // If the week starts on Monday, the end of the week for 2 September 2014:
       * const result = Temporal.ZonedDateTime.from("2014-09-02").endOfWeek({ weekStartsOn: 1 })
       * //=> 2014-09-07
       */
      endOfWeek(options?: Temporal.WeekOptions): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.endOfWeek = function (options: Temporal.WeekOptions = {}): Temporal.ZonedDateTime {
  const { dayOfWeek, daysInWeek } = this;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? -daysInWeek : 0) + 6 - (dayOfWeek - weekStartsOn);
  return this.add({ days }).endOfDay();
};
