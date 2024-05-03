import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      toLegacyDate(): Date;
    }
  }
}

Temporal.ZonedDateTime.prototype.toLegacyDate = function () {
  return new Date(this.epochMilliseconds);
};
