import { Temporal } from "temporal-polyfill";

export function startOfYear(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.with({ month: 1, day: 1 });
}
