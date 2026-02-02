import { Temporal } from "temporal-polyfill";

// TODO: update this for micro and nano seconds once available
/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00 UTC:
 * const result = Temporal.ZonedDateTime.from("2024-09-02T11:55:00.000+00:00[UTC]").startOfDay()
 * //=> Tue Sep 02 2014 00:00:00.000
 */
export const startOfDayOpts = { hour: 0, minute: 0, second: 0, millisecond: 0 } as Temporal.ZonedDateTimeLike;

export function startOfDay(date: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return date.with(startOfDayOpts);
}
