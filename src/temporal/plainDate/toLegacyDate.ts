import { Temporal } from "temporal-polyfill";

type TimeZoneAndTime = Parameters<Temporal.PlainDate["toZonedDateTime"]>[0];

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      toLegacyDate(tzLike: TimeZoneAndTime): Date;
    }
  }
}

Temporal.PlainDate.prototype.toLegacyDate = function (timeZoneAndTime) {
  return new Date(this.toZonedDateTime(timeZoneAndTime).epochMilliseconds);
};
