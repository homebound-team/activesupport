import { Temporal } from "temporal-polyfill";

const originalToString = Temporal.PlainDate.prototype.toString;

function isDateTimeFormatOptions(options: unknown): options is Intl.DateTimeFormatOptions {
  if (!options || typeof options !== "object") return false;
  const o = options as Record<string, unknown>;
  return (
    "month" in o ||
    "year" in o ||
    "day" in o ||
    "hour" in o ||
    "minute" in o ||
    "second" in o ||
    "weekday" in o ||
    "era" in o ||
    "dateStyle" in o ||
    "timeStyle" in o
  );
}

export function toStringImpl(
  this: Temporal.PlainDate,
  options?: Temporal.ShowCalendarOption | Intl.DateTimeFormatOptions,
): string {
  if (options && isDateTimeFormatOptions(options)) {
    return this.toLocaleString("en-US", options);
  }
  return originalToString.call(this, options as Temporal.ShowCalendarOption);
}

export function toString(
  date: Temporal.PlainDate,
  options?: Temporal.ShowCalendarOption | Intl.DateTimeFormatOptions,
): string {
  return toStringImpl.call(date, options);
}
