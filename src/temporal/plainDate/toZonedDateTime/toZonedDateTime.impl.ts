import { Temporal } from "temporal-polyfill";

export const [toET, toCT, toMT, toPT, toUTC] = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "UTC",
].map((timeZone) => (date: Temporal.PlainDate) => date.toZonedDateTime(timeZone));
