import { Temporal } from "temporal-polyfill";

export function startOfMonthImpl(this: Temporal.PlainDate): Temporal.PlainDate {
  return this.with({ day: 1 });
}

export function startOfMonth(date: Temporal.PlainDate): Temporal.PlainDate {
  return startOfMonthImpl.call(date);
}
