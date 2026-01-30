import { partitionImpl } from "src/array/partition/partition.impl";
import { sumImpl } from "src/array/sum/sum.impl";
import { CallbackFn } from "src/array/utils";
import { Interval } from "src/temporal/interval/interval.impl";
import { isAfterImpl } from "src/temporal/plainDate/isAfter/isAfter.impl";
import { isWeekendImpl } from "src/temporal/plainDate/isWeekend/isWeekend.impl";
import { BusinessDayOptions, assertValidBusinessDays } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

// Implementation converted from previous code located in businessDaysUtils.ts.  I'm not entirely sure it's
// correct but the tests (also converted) all pass.
export function differenceInBusinessDaysImpl(
  this: Temporal.PlainDate,
  other: Temporal.PlainDate,
  options: BusinessDayOptions = {},
): number {
  assertValidBusinessDays(options);
  const { exceptions = {}, businessDays } = options;
  if (this.equals(other)) return 0;
  // figure out if we're going backwards or forwards through time
  const sign = isAfterImpl.call(this, other) ? 1 : -1;
  const [start, end] = [other, this];
  // determine the number of integer weeks in our range
  const { weeks } = start.until(end, { largestUnit: "weeks" });
  // multiply by the number of days in a business week to get a baseline number of days
  let result = weeks * businessDays.length;
  let current = start.add({ weeks });
  // account for the remaining days that don't make up a full week.  this loop will run at most 6 times.
  while (!current.equals(end)) {
    if (!isWeekendImpl.call(current, options)) result += sign;
    current = current.add({ days: sign });
  }
  const exceptionEntries = Object.entries(exceptions).map(
    ([str, working]) => [Temporal.PlainDate.from(str), working] as const,
  );
  if (exceptionEntries.isEmpty) return result;
  // handle exceptions if present
  const interval = Interval.from(start, end);
  const exceptionDates = exceptionEntries
    // filter out exception dates outside our range
    .filter(([exception]) => interval.contains(exception));
  type R = readonly [Temporal.PlainDate, boolean];
  const [boundaryExceptions, innerExceptions] = partitionImpl.call<R[], [CallbackFn<R, boolean>], [R[], R[]]>(
    exceptionDates,
    ([d]) => d.equals(start) || d.equals(end),
  );
  const exceptionCount: number = sumImpl.call<R[], [CallbackFn<R, number | undefined>], any>(
    innerExceptions,
    ([exception, working]) => {
      if (working && isWeekendImpl.call(exception, options)) {
        // add a day if we are working on a weekend
        return sign;
      } else if (!working && !isWeekendImpl.call(exception, options)) {
        // remove a day if we are not working on a weekday
        return -sign;
      }
    },
  );
  // handle start and end dates. if both are working days, then add one. if both are not working days, then remove
  // one. Otherwise, do nothing.
  if (boundaryExceptions.length === 2) {
    const [[, working1], [, working2]] = boundaryExceptions;
    if (working1 === working2) result += working1 ? sign : -sign;
  }

  return result + exceptionCount;
}

export function differenceInBusinessDays(
  date: Temporal.PlainDate,
  other: Temporal.PlainDate,
  options?: BusinessDayOptions,
): number {
  return differenceInBusinessDaysImpl.call(date, other, options);
}
