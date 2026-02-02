import { partition } from "src/array/partition/partition.impl";
import { sum } from "src/array/sum/sum.impl";
import { Interval } from "src/temporal/interval/interval.impl";
import { isAfter } from "src/temporal/plainDate/isAfter/isAfter.impl";
import { isWeekend } from "src/temporal/plainDate/isWeekend/isWeekend.impl";
import { BusinessDayOptions, assertValidBusinessDays } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

// Implementation converted from previous code located in businessDaysUtils.ts.  I'm not entirely sure it's
// correct but the tests (also converted) all pass.
/**
 * @name differenceInBusinessDays
 * @category Day Helpers
 * @summary Get the number of business days between two dates.
 *
 * @description
 * Get the number of business day periods between two dates.
 * Business days being days that aren't in the weekend.
 *
 * @param date - the later date
 * @param other - the earlier date
 * @param options - an object with options.
 * @param options.businessDays - the business days. default is Monday to Friday.
 * @param options.exceptions - exceptions to the business days. Map of date string to boolean.
 * @returns the number of business days
 *
 * @example
 * // How many business days are between 10 January 2014 and 20 July 2014?
 * differenceInBusinessDays(
 *   Temporal.PlainDate.from("2014-07-20"),
 *   Temporal.PlainDate.from("2014-01-10")
 * )
 * //=> 136
 */
export function differenceInBusinessDays(
  date: Temporal.PlainDate,
  other: Temporal.PlainDate,
  options: BusinessDayOptions = {},
): number {
  assertValidBusinessDays(options);
  const { exceptions = {}, businessDays } = options;
  if (date.equals(other)) return 0;
  // figure out if we're going backwards or forwards through time
  const sign = isAfter(date, other) ? 1 : -1;
  const [start, end] = [other, date];
  // determine the number of integer weeks in our range
  const { weeks } = start.until(end, { largestUnit: "weeks" });
  // multiply by the number of days in a business week to get a baseline number of days
  let result = weeks * businessDays.length;
  let current = start.add({ weeks });
  // account for the remaining days that don't make up a full week.  this loop will run at most 6 times.
  while (!current.equals(end)) {
    if (!isWeekend(current, options)) result += sign;
    current = current.add({ days: sign });
  }
  const exceptionEntries = Object.entries(exceptions).map(
    ([str, working]) => [Temporal.PlainDate.from(str), working] as const,
  );
  if (exceptionEntries.length === 0) return result;
  // handle exceptions if present
  const interval = Interval.from(start, end);
  const exceptionDates = exceptionEntries
    // filter out exception dates outside our range
    .filter(([exception]) => interval.contains(exception));
  const [boundaryExceptions, innerExceptions] = partition(exceptionDates, ([d]) => d.equals(start) || d.equals(end));
  const exceptionCount = sum(innerExceptions, ([exception, working]) => {
    if (working && isWeekend(exception, options)) {
      // add a day if we are working on a weekend
      return sign;
    } else if (!working && !isWeekend(exception, options)) {
      // remove a day if we are not working on a weekday
      return -sign;
    }
  });
  // handle start and end dates. if both are working days, then add one. if both are not working days, then remove
  // one. Otherwise, do nothing.
  if (boundaryExceptions.length === 2) {
    const [[, working1], [, working2]] = boundaryExceptions;
    if (working1 === working2) result += working1 ? sign : -sign;
  }

  return result + exceptionCount;
}
