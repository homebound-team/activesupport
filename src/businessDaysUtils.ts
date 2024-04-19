import { addDays, differenceInCalendarDays, format, isAfter, isBefore, isSameDay, isValid, toDate } from "date-fns";
/**
 * @name addBusinessDays
 * @category Day Helpers
 * @summary Add the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of business days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @param {Object} [options] - an object with options.
 * @param {Number[]} [options.businessDays=[1, 2, 3, 4, 5]] - the business days. default is Monday to Friday.
 * @param {Record<string, boolean>} [options.exceptions={}] - exceptions to the business days. Map of date string (with format "MM/DD/YY") to boolean.
 * @returns {Date} the new date with the business days added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 10 business days to 1 September 2014:
 * const result = addBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Sep 15 2014 00:00:00 (skipped weekend days)
 */
export function addBusinessDays(
  dirtyDate: Date | number,
  dirtyAmount: number,
  dirtyOptions?: {
    businessDays?: number[];
    exceptions?: Record<string, boolean>;
  },
): Date {
  const options = dirtyOptions || {};
  const exceptions = options.exceptions || {};
  const businessDays = options.businessDays || [1, 2, 3, 4, 5];

  // Throw a RangeError if businessDays includes a number greater than 6
  if (businessDays?.filter((number) => number > 6).length > 0) {
    throw new RangeError("business days must be between 0 and 6");
  }

  const initialDate = toDate(dirtyDate);

  const amount = dirtyAmount > 0 ? Math.floor(dirtyAmount) : Math.ceil(dirtyAmount);

  if (isNaN(amount)) return new Date(NaN);

  if (initialDate.toString() === "Invalid Date") {
    return initialDate;
  }

  // returns a boolean if the date has an exception
  // true means the date is a working day
  // false means the date is not a working day
  const findException = (date: Date): boolean | undefined => {
    return exceptions[format(date, "MM/dd/yy")];
  };

  // returns true if the date is a business day (doesn't account for exceptions)
  const isBusinessDay = (date: Date): boolean => businessDays.includes(date.getDay());

  // returns true if the date is a working day (accounts for exceptions)
  const isWorkingDay = (date: Date) => {
    const isDateIncluded = options.exceptions ? findException(date) : undefined;
    if (isDateIncluded === false) return false;
    if (isDateIncluded === true || isBusinessDay(date)) {
      return true;
    }
    return false;
  };

  const newDate = new Date(initialDate);
  const sign = amount < 0 ? -1 : 1;

  // start on initial day and continue until we have gone through all the days
  let dayCounter = Math.abs(amount);
  while (dayCounter > 0) {
    newDate.setDate(newDate.getDate() + sign);
    if (isWorkingDay(newDate)) dayCounter -= 1;
  }

  // If we land on a non-working date, we add/subtract days accordingly to land on the next business day
  const reduceIfNonWorkingDay = (date: Date) => {
    if (!isWorkingDay(date) && amount !== 0) {
      date.setDate(date.getDate() + sign);
      reduceIfNonWorkingDay(date);
    }
  };

  reduceIfNonWorkingDay(newDate);

  // Restore hours to avoid DST lag
  newDate.setHours(initialDate.getHours());

  return newDate;
}

/**
 * @name subBusinessDays
 * @category Day Helpers
 * @summary Substract the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Substract the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of business days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @param {Object} [options] - an object with options.
 * @param {Number[]} [options.businessDays=[1, 2, 3, 4, 5]] - the business days. default is Monday to Friday.
 * @param {Record<string, boolean>} [options.exceptions={}] - exceptions to the business days. Map of date string (with format "MM/DD/YY") to boolean.
 * @returns {Date} the new date with the business days subtracted
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} businessDays cannot include numbers greater than 6
 *
 * @example
 * // Substract 10 business days from 1 September 2014:
 * const result = subBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Aug 18 2014 00:00:00 (skipped weekend days)
 */
export function subBusinessDays(
  dirtyDate: Date | number,
  dirtyAmount: number,
  dirtyOptions?: {
    businessDays?: number[];
    exceptions?: Record<string, boolean>;
  },
) {
  const options = dirtyOptions || {};
  const businessDays = options.businessDays || [1, 2, 3, 4, 5];
  const exceptions = options.exceptions || {};

  // Throw a RangeError if businessDays includes a number greater than 6
  if (businessDays?.filter((number) => number > 6).length > 0) {
    throw new RangeError("business days must be between 0 and 6");
  }

  return addBusinessDays(dirtyDate, -dirtyAmount, { businessDays, exceptions });
}

/**
 * @name differenceInBusinessDays
 * @category Day Helpers
 * @summary Get the number of business days between the given dates.
 *
 * @description
 * Get the number of business day periods between the given dates.
 * Business days being days that arent in the weekend.
 * Like `differenceInCalendarDays`, the function removes the times from
 * the dates before calculating the difference.
 *

 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
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
export function differenceInBusinessDays(
  dirtyDateLeft: Date | number,
  dirtyDateRight: Date | number,
  dirtyOptions?: {
    businessDays?: number[];
    exceptions?: Record<string, boolean>;
  },
): number {
  const options = dirtyOptions || {};
  const businessDays = options.businessDays || [1, 2, 3, 4, 5];

  // Throw a RangeError if businessDays includes a number greater than 6
  if (businessDays?.filter((number) => number > 6).length > 0) {
    throw new RangeError("business days must be between 0 and 6");
  }

  const dateLeft = toDate(dirtyDateLeft);
  const dateRight = toDate(dirtyDateRight);
  const isHoliday = (date: Date) => !businessDays.includes(date.getDay());

  if (!isValid(dateLeft) || !isValid(dateRight)) return NaN;

  const calendarDifference = differenceInCalendarDays(dateLeft, dateRight);
  const sign = calendarDifference < 0 ? -1 : 1;

  const isInDateBounds = (date: Date) => {
    return sign > 0
      ? isBefore(date, dateLeft) && isAfter(date, dateRight)
      : isAfter(date, dateLeft) && isBefore(date, dateRight);
  };

  const weeks = Math.trunc(calendarDifference / 7);

  let result = weeks * businessDays.length;
  let newDateRight = addDays(dateRight, weeks * 7);

  // the loop below will run at most 6 times to account for the remaining days that don't make up a full week
  while (!isSameDay(dateLeft, newDateRight)) {
    // sign is used to account for both negative and positive differences
    result += isHoliday(newDateRight) ? 0 : sign;
    newDateRight = addDays(newDateRight, sign);
  }

  // handle exceptions
  let exceptionCount = 0;
  if (options.exceptions) {
    const exceptionDates = Object.keys(options.exceptions);
    exceptionDates.forEach((e) => {
      const date = new Date(e);
      if (!isValid(date)) return;
      // if date is within the left and right dates
      if (isInDateBounds(date)) {
        if (
          // if exception is true and date is not a business day
          options.exceptions![e] === true &&
          !businessDays.includes(date.getDay())
        ) {
          // add a day
          exceptionCount += sign;
        } else if (
          // if exception is false and date is a business day
          options.exceptions![e] === false &&
          businessDays.includes(date.getDay())
        ) {
          // subtract a day
          exceptionCount -= sign;
        }
      }
    });
    // handle exceptions for dateLeft and dateRight
    // if both are true, add one; if both are false, add two; do nothing in all other cases
    const leftAndRightExceptions = exceptionDates.filter((e) => {
      const date = new Date(e);
      return isSameDay(date, dateLeft) || isSameDay(date, dateRight);
    });
    if (leftAndRightExceptions.length === 2) {
      if (leftAndRightExceptions.every((e) => options.exceptions![e] === true)) {
        exceptionCount++;
      } else if (leftAndRightExceptions.every((e) => options.exceptions![e] === false)) {
        exceptionCount--;
      }
    }
  }

  return result + exceptionCount;
}
