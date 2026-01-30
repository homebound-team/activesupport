import { Temporal } from "temporal-polyfill";

export function isMondayImpl(this: Temporal.ZonedDateTime): boolean {
  return this.dayOfWeek === 1;
}

export function isTuesdayImpl(this: Temporal.ZonedDateTime): boolean {
  return this.dayOfWeek === 2;
}

export function isWednesdayImpl(this: Temporal.ZonedDateTime): boolean {
  return this.dayOfWeek === 3;
}

export function isThursdayImpl(this: Temporal.ZonedDateTime): boolean {
  return this.dayOfWeek === 4;
}

export function isFridayImpl(this: Temporal.ZonedDateTime): boolean {
  return this.dayOfWeek === 5;
}

export function isSaturdayImpl(this: Temporal.ZonedDateTime): boolean {
  return this.dayOfWeek === 6;
}

export function isSundayImpl(this: Temporal.ZonedDateTime): boolean {
  return this.dayOfWeek === 7;
}

export function isMonday(date: Temporal.ZonedDateTime): boolean {
  return isMondayImpl.call(date);
}

export function isTuesday(date: Temporal.ZonedDateTime): boolean {
  return isTuesdayImpl.call(date);
}

export function isWednesday(date: Temporal.ZonedDateTime): boolean {
  return isWednesdayImpl.call(date);
}

export function isThursday(date: Temporal.ZonedDateTime): boolean {
  return isThursdayImpl.call(date);
}

export function isFriday(date: Temporal.ZonedDateTime): boolean {
  return isFridayImpl.call(date);
}

export function isSaturday(date: Temporal.ZonedDateTime): boolean {
  return isSaturdayImpl.call(date);
}

export function isSunday(date: Temporal.ZonedDateTime): boolean {
  return isSundayImpl.call(date);
}
