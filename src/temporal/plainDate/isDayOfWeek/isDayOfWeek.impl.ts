import { Temporal } from "temporal-polyfill";

export function isDayOfWeekImpl(this: Temporal.PlainDate, dayNumber: number): boolean {
  return this.dayOfWeek === dayNumber;
}

export function isMonday(date: Temporal.PlainDate): boolean {
  return isDayOfWeekImpl.call(date, 1);
}

export function isTuesday(date: Temporal.PlainDate): boolean {
  return isDayOfWeekImpl.call(date, 2);
}

export function isWednesday(date: Temporal.PlainDate): boolean {
  return isDayOfWeekImpl.call(date, 3);
}

export function isThursday(date: Temporal.PlainDate): boolean {
  return isDayOfWeekImpl.call(date, 4);
}

export function isFriday(date: Temporal.PlainDate): boolean {
  return isDayOfWeekImpl.call(date, 5);
}

export function isSaturday(date: Temporal.PlainDate): boolean {
  return isDayOfWeekImpl.call(date, 6);
}

export function isSunday(date: Temporal.PlainDate): boolean {
  return isDayOfWeekImpl.call(date, 7);
}
