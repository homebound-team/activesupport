import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * @name differenceInBusinessDays
       * @category Day Helpers
       * @summary Get the number of business days between the given dates.
       *
       * @description
       * Get the number of business day periods between the given dates.
       * Business days being days that aren't in the weekend.
       * Like `differenceInCalendarDays`, the function removes the times from
       * the dates before calculating the difference.
       *
       * @param {Date|Number} other - the earlier date
       * @param {Object} [options] - an object with options.
       * @param {Number[]} [options.businessDays=[1, 2, 3, 4, 5]] - the business days. default is Monday to Friday.
       * @param {Record<string, boolean>} [options.exceptions={}] - exceptions to the business days. Map of date string (with format "MM/DD/YY") to boolean.
       * @returns {Number} the number of business days
       * @throws {TypeError} 2 arguments required
       * @throws {RangeError} businessDays cannot include numbers greater than 6
       *
       * @example
       * // How many business days are between
       * // 10 January 2014 and 20 July 2014?
       * const result = differenceInBusinessDays(
       *   new Date(2014, 6, 20),
       *   new Date(2014, 0, 10)
       * )
       * //=> 136
       *
       * // How many business days are between
       * // 30 November 2021 and 1 November 2021?
       * const result = differenceInBusinessDays(
       *   new Date(2021, 10, 30),
       *   new Date(2021, 10, 1)
       * )
       * //=> 21
       *
       * // How many business days are between
       * // 1 November 2021 and 1 December 2021?
       * const result = differenceInBusinessDays(
       *   new Date(2021, 10, 1),
       *   new Date(2021, 11, 1)
       * )
       * //=> -22
       *
       * // How many business days are between
       * // 1 November 2021 and 1 November 2021 ?
       * const result = differenceInBusinessDays(
       *   new Date(2021, 10, 1),
       *   new Date(2021, 10, 1)
       * )
       * //=> 0
       */
      differenceInBusinessDays(other: Temporal.ZonedDateTime, options?: BusinessDayOptions): number;
    }
  }
}

Temporal.ZonedDateTime.prototype.differenceInBusinessDays = function (
  other: Temporal.ZonedDateTime,
  options: Temporal.BusinessDayOptions = {},
) {
  return this.toPlainDate().differenceInBusinessDays(other.toPlainDate(), options);
};
