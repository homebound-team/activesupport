import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      toPlainDateUTC(): Temporal.PlainDate;
      toPlainDateET(): Temporal.PlainDate;
      toPlainDateCT(): Temporal.PlainDate;
      toPlainDateMT(): Temporal.PlainDate;
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
