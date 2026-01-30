import { Temporal } from "temporal-polyfill";

export const [toPlainDateET, toPlainDateCT, toPlainDateMT, toPlainDatePT, toPlainDateUTC] = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "UTC",
].map((timeZone) => (date: Temporal.ZonedDateTime) => date.withTimeZone(timeZone).toPlainDate());
