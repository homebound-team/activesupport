import { Temporal } from "temporal-polyfill";

export function endOfMonthImpl(this: Temporal.PlainDate): Temporal.PlainDate {
  return this.with({ day: this.daysInMonth });
}

export function endOfMonth(date: Temporal.PlainDate): Temporal.PlainDate {
  return endOfMonthImpl.call(date);
}
