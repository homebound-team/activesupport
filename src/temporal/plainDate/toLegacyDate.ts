import { Temporal } from "temporal-polyfill";

type TimeZoneAndTime = Parameters<Temporal.PlainDate["toZonedDateTime"]>[0];

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * Converts the PlainDate to a legacy JavaScript Date object in the specified timezone.
       * This method first converts the PlainDate to a ZonedDateTime using the provided timezone,
       * then extracts the epoch milliseconds to create the Date.
       * @param tzLike A timezone identifier (e.g., "America/New_York", "UTC") or a PlainTime/object with timezone info
       * @returns A JavaScript Date object representing this date at midnight in the specified timezone
       * @example Temporal.PlainDate.from("2023-05-02").toLegacyDate("America/New_York") //=> Date("2023-05-02T04:00:00.000Z")
       * @example Temporal.PlainDate.from("2023-05-02").toLegacyDate("UTC") //=> Date("2023-05-02T00:00:00.000Z")
       */
      toLegacyDate(tzLike: TimeZoneAndTime): Date;
    }
  }
}

Temporal.PlainDate.prototype.toLegacyDate = function (timeZoneAndTime) {
  return new Date(this.toZonedDateTime(timeZoneAndTime).epochMilliseconds);
};
