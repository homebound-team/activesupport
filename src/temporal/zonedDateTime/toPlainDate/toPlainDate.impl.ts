import { Temporal } from "temporal-polyfill";

export function toPlainDateUTCImpl(this: Temporal.ZonedDateTime): Temporal.PlainDate {
  return this.withTimeZone("UTC").toPlainDate();
}

export function toPlainDateETImpl(this: Temporal.ZonedDateTime): Temporal.PlainDate {
  return this.withTimeZone("America/New_York").toPlainDate();
}

export function toPlainDateCTImpl(this: Temporal.ZonedDateTime): Temporal.PlainDate {
  return this.withTimeZone("America/Chicago").toPlainDate();
}

export function toPlainDateMTImpl(this: Temporal.ZonedDateTime): Temporal.PlainDate {
  return this.withTimeZone("America/Denver").toPlainDate();
}

export function toPlainDatePTImpl(this: Temporal.ZonedDateTime): Temporal.PlainDate {
  return this.withTimeZone("America/Los_Angeles").toPlainDate();
}

export function toPlainDateUTC(date: Temporal.ZonedDateTime): Temporal.PlainDate {
  return toPlainDateUTCImpl.call(date);
}

export function toPlainDateET(date: Temporal.ZonedDateTime): Temporal.PlainDate {
  return toPlainDateETImpl.call(date);
}

export function toPlainDateCT(date: Temporal.ZonedDateTime): Temporal.PlainDate {
  return toPlainDateCTImpl.call(date);
}

export function toPlainDateMT(date: Temporal.ZonedDateTime): Temporal.PlainDate {
  return toPlainDateMTImpl.call(date);
}

export function toPlainDatePT(date: Temporal.ZonedDateTime): Temporal.PlainDate {
  return toPlainDatePTImpl.call(date);
}
