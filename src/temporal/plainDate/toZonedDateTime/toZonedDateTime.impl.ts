import { Temporal } from "temporal-polyfill";

export function toUTCImpl(this: Temporal.PlainDate): Temporal.ZonedDateTime {
  return this.toZonedDateTime("UTC");
}

export function toETImpl(this: Temporal.PlainDate): Temporal.ZonedDateTime {
  return this.toZonedDateTime("America/New_York");
}

export function toCTImpl(this: Temporal.PlainDate): Temporal.ZonedDateTime {
  return this.toZonedDateTime("America/Chicago");
}

export function toMTImpl(this: Temporal.PlainDate): Temporal.ZonedDateTime {
  return this.toZonedDateTime("America/Denver");
}

export function toPTImpl(this: Temporal.PlainDate): Temporal.ZonedDateTime {
  return this.toZonedDateTime("America/Los_Angeles");
}

export function toUTC(date: Temporal.PlainDate): Temporal.ZonedDateTime {
  return toUTCImpl.call(date);
}

export function toET(date: Temporal.PlainDate): Temporal.ZonedDateTime {
  return toETImpl.call(date);
}

export function toCT(date: Temporal.PlainDate): Temporal.ZonedDateTime {
  return toCTImpl.call(date);
}

export function toMT(date: Temporal.PlainDate): Temporal.ZonedDateTime {
  return toMTImpl.call(date);
}

export function toPT(date: Temporal.PlainDate): Temporal.ZonedDateTime {
  return toPTImpl.call(date);
}
