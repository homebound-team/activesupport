import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Converts the ZonedDateTime to a PlainDate in UTC timezone.
       * The returned date represents what calendar date it is in UTC when this instant occurs.
       * @returns A PlainDate representing the calendar date in UTC
       * @example Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000+09:00[Asia/Tokyo]").toPlainDateUTC() //=> PlainDate("2024-05-01")
       */
      toPlainDateUTC(): Temporal.PlainDate;
      /**
       * Converts the ZonedDateTime to a PlainDate in Eastern Time (America/New_York).
       * The returned date represents what calendar date it is in ET when this instant occurs.
       * @returns A PlainDate representing the calendar date in Eastern Time
       * @example Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z").toPlainDateET() //=> PlainDate("2024-05-01")
       */
      toPlainDateET(): Temporal.PlainDate;
      /**
       * Converts the ZonedDateTime to a PlainDate in Central Time (America/Chicago).
       * The returned date represents what calendar date it is in CT when this instant occurs.
       * @returns A PlainDate representing the calendar date in Central Time
       * @example Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z").toPlainDateCT() //=> PlainDate("2024-05-01")
       */
      toPlainDateCT(): Temporal.PlainDate;
      /**
       * Converts the ZonedDateTime to a PlainDate in Mountain Time (America/Denver).
       * The returned date represents what calendar date it is in MT when this instant occurs.
       * @returns A PlainDate representing the calendar date in Mountain Time
       * @example Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z").toPlainDateMT() //=> PlainDate("2024-05-01")
       */
      toPlainDateMT(): Temporal.PlainDate;
      /**
       * Converts the ZonedDateTime to a PlainDate in Pacific Time (America/Los_Angeles).
       * The returned date represents what calendar date it is in PT when this instant occurs.
       * @returns A PlainDate representing the calendar date in Pacific Time
       * @example Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z").toPlainDatePT() //=> PlainDate("2024-05-01")
       */
      toPlainDatePT(): Temporal.PlainDate;
    }
  }
}

(
  [
    ["UTC", "UTC"],
    ["ET", "America/New_York"],
    ["CT", "America/Chicago"],
    ["MT", "America/Denver"],
    ["PT", "America/Los_Angeles"],
  ] as const
).map(([shorthand, timeZone]) => {
  Temporal.ZonedDateTime.prototype[`toPlainDate${shorthand}`] = function () {
    return this.withTimeZone(timeZone).toPlainDate();
  };
});
