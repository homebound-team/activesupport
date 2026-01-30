import { Temporal } from "temporal-polyfill";

// TODO: update this for micro and nano seconds once available
export const startOfDayOpts = { hour: 0, minute: 0, second: 0, millisecond: 0 } as Temporal.ZonedDateTimeLike;

export function startOfDayImpl(this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return this.with(startOfDayOpts);
}

export function startOfDay(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return startOfDayImpl.call(date);
}
