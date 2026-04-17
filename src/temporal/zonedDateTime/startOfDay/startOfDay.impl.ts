import { Temporal } from "temporal-polyfill";

// TODO: update this for micro and nano seconds once available
/**
 * Returns the start of a day for a ZonedDateTime.
 * @param date - The date to get the start of day for
 * @returns The start of a day
 * @example
 * startOfDay(Temporal.ZonedDateTime.from("2014-09-02T11:55:00.000+00:00[UTC]"))
 * //=> 2014-09-02T00:00:00.000+00:00[UTC]
 */
export const startOfDayOpts = { hour: 0, minute: 0, second: 0, millisecond: 0 } as Temporal.ZonedDateTimeLike;

export function startOfDay(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with(startOfDayOpts);
}
