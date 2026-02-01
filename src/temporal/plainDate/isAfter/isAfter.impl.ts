import { Temporal } from "temporal-polyfill";

export function isAfter(date: Temporal.PlainDate, other: Temporal.PlainDate): boolean {
  return Temporal.PlainDate.compare(date, other) === 1;
}
