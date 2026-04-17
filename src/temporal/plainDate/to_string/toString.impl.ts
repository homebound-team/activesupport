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

/**
 * Returns a string representation of a PlainDate. When called with no arguments
 * or with Temporal's ShowCalendarOption, returns the ISO 8601 string.
 * When called with Intl.DateTimeFormatOptions, formats using toLocaleString
 * with "en-US" locale.
 * @param date - The PlainDate to format
 * @param options - Either ShowCalendarOption for ISO format or Intl.DateTimeFormatOptions for locale formatting
 * @returns The formatted date string
 * @example
 * // ISO format (default)
 * toString(Temporal.PlainDate.from("2024-01-15")) //=> "2024-01-15"
 * @example
 * // With locale formatting
 * toString(Temporal.PlainDate.from("2024-01-15"), { month: "long", year: "numeric" }) //=> "January 2024"
 */
export function toString(
  date: Temporal.PlainDate,
  options?: Temporal.ShowCalendarOption | Intl.DateTimeFormatOptions,
): string {
  if (options && isDateTimeFormatOptions(options)) {
    return date.toLocaleString("en-US", options);
  }
  return originalToString.call(date, options as Temporal.ShowCalendarOption);
}
