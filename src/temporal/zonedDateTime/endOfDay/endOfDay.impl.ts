import { Temporal } from "temporal-polyfill";

// TODO: update this for micro and nano seconds once available
export const endOfDayOpts = { hour: 23, minute: 59, second: 59, millisecond: 999 } satisfies Temporal.ZonedDateTimeLike;

export function endOfDay(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with(endOfDayOpts);
}
