import { Temporal } from "temporal-polyfill";

export function startOfYearImpl(this: Temporal.PlainDate): Temporal.PlainDate {
  return this.with({ month: 1, day: 1 });
}

export function startOfYear(date: Temporal.PlainDate): Temporal.PlainDate {
  return startOfYearImpl.call(date);
}
