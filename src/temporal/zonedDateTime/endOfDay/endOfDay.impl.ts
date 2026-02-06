import { Temporal } from "temporal-polyfill";

// TODO: update this for micro and nano seconds once available
/**
 * Returns the end of a day for a given date.
 * @param date - The date to get the end of day for
 * @returns The end of a day
 * @example
 * endOfDay(Temporal.ZonedDateTime.from("2014-09-02T11:55:00.000+00:00[UTC]"))
 * //=> 2014-09-02T23:59:59.999+00:00[UTC]
 */
export const endOfDayOpts = { hour: 23, minute: 59, second: 59, millisecond: 999 } satisfies Temporal.ZonedDateTimeLike;

export function endOfDay(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with(endOfDayOpts);
}
