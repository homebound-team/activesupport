import { Temporal } from "temporal-polyfill";
import * as toZonedDateTime from "./toZonedDateTime.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Converts the PlainDate to a ZonedDateTime in UTC timezone.
       * @returns A ZonedDateTime representing this date at midnight UTC
       * @example Temporal.PlainDate.from("2024-05-02").toUTC() //=> ZonedDateTime("2024-05-02T00:00:00.000Z")
       */
      toUTC(): Temporal.ZonedDateTime;
      /**
       * Converts the PlainDate to a ZonedDateTime in Eastern Time (America/New_York).
       * @returns A ZonedDateTime representing this date at midnight ET
       * @example Temporal.PlainDate.from("2024-05-02").toET() //=> ZonedDateTime("2024-05-02T04:00:00.000Z")
       */
      toET(): Temporal.ZonedDateTime;
      /**
       * Converts the PlainDate to a ZonedDateTime in Central Time (America/Chicago).
       * @returns A ZonedDateTime representing this date at midnight CT
       * @example Temporal.PlainDate.from("2024-05-02").toCT() //=> ZonedDateTime("2024-05-02T05:00:00.000Z")
       */
      toCT(): Temporal.ZonedDateTime;
      /**
       * Converts the PlainDate to a ZonedDateTime in Mountain Time (America/Denver).
       * @returns A ZonedDateTime representing this date at midnight MT
       * @example Temporal.PlainDate.from("2024-05-02").toMT() //=> ZonedDateTime("2024-05-02T06:00:00.000Z")
       */
      toMT(): Temporal.ZonedDateTime;
      /**
       * Converts the PlainDate to a ZonedDateTime in Pacific Time (America/Los_Angeles).
       * @returns A ZonedDateTime representing this date at midnight PT
       * @example Temporal.PlainDate.from("2024-05-02").toPT() //=> ZonedDateTime("2024-05-02T07:00:00.000Z")
       */
      toPT(): Temporal.ZonedDateTime;
    }
  }
}

Object.entries(toZonedDateTime).forEach(
  ([name, impl]) =>
    (Temporal.PlainDate.prototype[name] = function (this: Temporal.PlainDate) {
      return impl(this);
    }),
);
