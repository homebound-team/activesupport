import { Temporal } from "temporal-polyfill";
import * as toPlainDate from "./toPlainDate.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      /**
       * Converts the ZonedDateTime to a PlainDate in Eastern Time (America/New_York).
       * @returns The PlainDate in Eastern Time
       * @example Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z").toPlainDateET() //=> "2024-05-01".PlainDate()
       */
      toPlainDateET(): Temporal.PlainDate;
      /**
       * Converts the ZonedDateTime to a PlainDate in Central Time (America/Chicago).
       * @returns The PlainDate in Central Time
       * @example Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z").toPlainDateCT() //=> "2024-05-01".PlainDate()
       */
      toPlainDateCT(): Temporal.PlainDate;
      /**
       * Converts the ZonedDateTime to a PlainDate in Mountain Time (America/Denver).
       * @returns The PlainDate in Mountain Time
       * @example Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z").toPlainDateMT() //=> "2024-05-01".PlainDate()
       */
      toPlainDateMT(): Temporal.PlainDate;
      /**
       * Converts the ZonedDateTime to a PlainDate in Pacific Time (America/Los_Angeles).
       * @returns The PlainDate in Pacific Time
       * @example Temporal.ZonedDateTime.from("2024-05-02T00:00:00.000Z").toPlainDatePT() //=> "2024-05-01".PlainDate()
       */
      toPlainDatePT(): Temporal.PlainDate;
      /**
       * Converts the ZonedDateTime to a PlainDate in UTC.
       * @returns The PlainDate in UTC
       * @example Temporal.ZonedDateTime.from("2024-05-02T04:00:00.000+09:00[Asia/Tokyo]").toPlainDateUTC() //=> "2024-05-01".PlainDate()
       */
      toPlainDateUTC(): Temporal.PlainDate;
    }
  }
}

Object.entries(toPlainDate).forEach(
  ([name, impl]) =>
    (Temporal.ZonedDateTime.prototype[name] = function (this: Temporal.ZonedDateTime) {
      return impl(this);
    }),
);
