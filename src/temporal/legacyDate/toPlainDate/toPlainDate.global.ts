import { toPlainDate } from "src/temporal/legacyDate/toPlainDate/toPlainDate.impl";
import { Temporal } from "temporal-polyfill";

declare global {
  interface Date {
    /**
     * Converts the legacy Date object to a Temporal.PlainDate in the specified timezone.
     * Extracts the calendar date portion after converting to the given timezone.
     * @param tzLike A timezone identifier (e.g., "America/New_York", "UTC") or Temporal timezone object
     * @returns A Temporal.PlainDate representing the calendar date in the specified timezone
     * @example new Date("2023-05-02T23:00:00Z").toPlainDate("UTC") //=> PlainDate("2023-05-02")
     * @example new Date("2023-05-02T23:00:00Z").toPlainDate("America/New_York") //=> PlainDate("2023-05-02")
     */
    toPlainDate(tzLike: Temporal.TimeZoneLike): Temporal.PlainDate;
  }
}

Date.prototype.toPlainDate = function (this: Date, tzLike: Temporal.TimeZoneLike) {
  return toPlainDate(this, tzLike);
};
