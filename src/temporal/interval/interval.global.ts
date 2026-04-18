import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    /**
     * Represents a time interval between two dates (PlainDate or ZonedDateTime).
     * Provides utilities for iterating through the interval and checking if values are contained within it.
     * @template T The date type (Temporal.PlainDate or Temporal.ZonedDateTime)
     * @example
     * const interval = Temporal.Interval.from(
     *   Temporal.PlainDate.from("2024-01-01"),
     *   Temporal.PlainDate.from("2024-03-31")
     * );
     */
    class Interval<T extends Temporal.PlainDate | Temporal.ZonedDateTime> {
      /**
       * Creates an Interval from a start and end date.
       * @template T The date type (Temporal.PlainDate or Temporal.ZonedDateTime)
       * @param start The start date of the interval
       * @param end The end date of the interval
       * @returns A new Interval instance
       * @example Temporal.Interval.from(start, end) //=> Interval { start, end }
       */
      static from<T extends Temporal.PlainDate | Temporal.ZonedDateTime>(start: T, end: T): Interval<T>;

      /**
       * The start date of the interval.
       */
      readonly start: T;

      /**
       * The end date of the interval.
       */
      readonly end: T;

      /**
       * Creates a new Interval.
       * @param start The start date of the interval
       * @param end The end date of the interval
       * @example new Temporal.Interval(start, end)
       */
      constructor(start: T, end: T);

      /**
       * Returns an array of dates representing the start of each month within the interval.
       * Supports both forward and backward iteration with configurable step size.
       * @param options Configuration options
       * @param options.step Number of months to skip between iterations (default: 1, can be negative)
       * @returns Array of dates at the start of each month in the interval
       * @example interval.eachMonth() //=> [date1, date2, date3]
       * @example interval.eachMonth({ step: 2 }) //=> every other month
       */
      eachMonth(options?: { step: number }): T[];

      /**
       * Returns an array of dates representing the start of each week within the interval.
       * Supports both forward and backward iteration with configurable step size and week start day.
       * @param options Configuration options
       * @param options.step Number of weeks to skip between iterations (default: 1, can be negative)
       * @param options.weekStartsOn Day of week that starts the week (1=Monday, 7=Sunday)
       * @returns Array of dates at the start of each week in the interval
       * @example interval.eachWeek() //=> [week1Start, week2Start, ...]
       * @example interval.eachWeek({ weekStartsOn: 1 }) //=> weeks starting on Monday
       */
      eachWeek(options?: { step?: number; weekStartsOn?: number }): T[];

      /**
       * Checks if a date value is contained within the interval.
       * By default includes boundary dates; can exclude them with options.
       * @param value The date to check
       * @param options Configuration options
       * @param options.excludeBoundaries If true, excludes start and end dates (default: false)
       * @returns True if the value is within the interval
       * @example interval.contains(someDate) //=> true
       * @example interval.contains(startDate, { excludeBoundaries: true }) //=> false
       */
      contains(value: T, options?: { excludeBoundaries?: boolean }): boolean;
    }
  }
}

Temporal.Interval = Interval;
