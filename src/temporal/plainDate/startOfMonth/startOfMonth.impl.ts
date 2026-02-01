import { Temporal } from "temporal-polyfill";

export function startOfMonth(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.with({ day: 1 });
}
