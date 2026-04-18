import { expect } from "@jest/globals";
import { Interval } from "src/temporal/interval/interval.impl";
import { Temporal } from "temporal-polyfill";

export function newPD(date: string): Temporal.PlainDate {
  return Temporal.PlainDate.from(date);
}

export function newZDT(datetime: string): Temporal.ZonedDateTime {
  if (datetime.endsWith("Z")) datetime = datetime.slice(0, -1).concat(`+00:00[UTC]`);
  return Temporal.ZonedDateTime.from(datetime);
}

export function newPDInterval(start: string, end: string): Interval<Temporal.PlainDate> {
  return Interval.from(newPD(start), newPD(end));
}

export function newZDTInterval(start: string, end: string): Interval<Temporal.ZonedDateTime> {
  return Interval.from(newZDT(start), newZDT(end));
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
