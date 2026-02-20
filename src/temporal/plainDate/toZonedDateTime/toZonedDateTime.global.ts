import { Temporal } from "temporal-polyfill";
import * as toZonedDateTime from "./toZonedDateTime.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Converts the PlainDate to a ZonedDateTime in Eastern Time (America/New_York).
       * @returns The ZonedDateTime in Eastern Time
       * @example Temporal.PlainDate.from("2024-05-02").toET() //=> "2024-05-02T04:00:00.000Z".ZonedDateTime()
       */
      toET(): Temporal.ZonedDateTime;
      /**
       * Converts the PlainDate to a ZonedDateTime in Central Time (America/Chicago).
       * @returns The ZonedDateTime in Central Time
       * @example Temporal.PlainDate.from("2024-05-02").toCT() //=> "2024-05-02T05:00:00.000Z".ZonedDateTime()
       */
      toCT(): Temporal.ZonedDateTime;
      /**
       * Converts the PlainDate to a ZonedDateTime in Mountain Time (America/Denver).
       * @returns The ZonedDateTime in Mountain Time
       * @example Temporal.PlainDate.from("2024-05-02").toMT() //=> "2024-05-02T06:00:00.000Z".ZonedDateTime()
       */
      toMT(): Temporal.ZonedDateTime;
      /**
       * Converts the PlainDate to a ZonedDateTime in Pacific Time (America/Los_Angeles).
       * @returns The ZonedDateTime in Pacific Time
       * @example Temporal.PlainDate.from("2024-05-02").toPT() //=> "2024-05-02T07:00:00.000Z".ZonedDateTime()
       */
      toPT(): Temporal.ZonedDateTime;
      /**
       * Converts the PlainDate to a ZonedDateTime in UTC.
       * @returns The ZonedDateTime in UTC
       * @example Temporal.PlainDate.from("2024-05-02").toUTC() //=> "2024-05-02T00:00:00.000Z".ZonedDateTime()
       */
      toUTC(): Temporal.ZonedDateTime;
    }
  }
}

Object.entries(toZonedDateTime).forEach(
  ([name, impl]) =>
    (Temporal.PlainDate.prototype[name] = function (this: Temporal.PlainDate) {
      return impl(this);
    }),
);
