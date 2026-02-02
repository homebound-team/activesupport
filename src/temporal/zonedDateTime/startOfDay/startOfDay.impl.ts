import { Temporal } from "temporal-polyfill";

// TODO: update this for micro and nano seconds once available
/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for a given date.
 *
 * @description
 * Return the start of a day for a given date.
 *
 * @param date - The date to get the start of day for
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00 UTC:
 * startOfDay(Temporal.ZonedDateTime.from("2014-09-02T11:55:00.000+00:00[UTC]"))
 * //=> 2014-09-02T00:00:00.000+00:00[UTC]
 */
export const startOfDayOpts = { hour: 0, minute: 0, second: 0, millisecond: 0 } as Temporal.ZonedDateTimeLike;

export function startOfDay(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with(startOfDayOpts);
}
