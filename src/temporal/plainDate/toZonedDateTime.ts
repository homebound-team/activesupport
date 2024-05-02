import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      toUTC(): Temporal.ZonedDateTime;
      toET(): Temporal.ZonedDateTime;
      toCT(): Temporal.ZonedDateTime;
      toMT(): Temporal.ZonedDateTime;
      toPT(): Temporal.ZonedDateTime;
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
  Temporal.PlainDate.prototype[`to${shorthand}`] = function () {
    return this.toZonedDateTime(timeZone);
  };
});
