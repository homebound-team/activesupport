import { expect } from "@jest/globals";
import { Temporal } from "temporal-polyfill";
import "../array";
import "../object";
import "./index";

export function newPD(date: string): Temporal.PlainDate {
  return Temporal.PlainDate.from(date);
}

export function newZDT(datetime: string, tzLike: Temporal.TimeZoneLike = "UTC"): Temporal.ZonedDateTime {
  return Temporal.Instant.from(datetime).toZonedDateTimeISO(tzLike);
}

export function newPDInterval(start: string, end: string): Temporal.Interval<Temporal.PlainDate> {
  return Temporal.Interval.from(newPD(start), newPD(end));
}

export function newZDTInterval(start: string, end: string): Temporal.Interval<Temporal.ZonedDateTime> {
  return Temporal.Interval.from(newZDT(start), newZDT(end));
}

export function areTemporalsEqual(a: unknown, b: unknown) {
  if (a instanceof Temporal.ZonedDateTime && b instanceof Temporal.ZonedDateTime) {
    return a.equals(b.withTimeZone(a.timeZoneId));
  }
  if (a instanceof Temporal.PlainDateTime && b instanceof Temporal.PlainDateTime) return a.equals(b);
  if (a instanceof Temporal.PlainDate && b instanceof Temporal.PlainDate) return a.equals(b);
  return undefined;
}

expect.addEqualityTesters([areTemporalsEqual]);
