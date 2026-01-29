import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface PlainDate {
      /**
       * @name toString
       * @category String Helpers
       * @summary Returns a string representation of this date.
       *
       * @description
       * Returns a string representation of this date. When called with no arguments
       * or with Temporal's ShowCalendarOption, returns the ISO 8601 string.
       * When called with Intl.DateTimeFormatOptions, formats using toLocaleString
       * with "en-US" locale.
       *
       * @param options - Either ShowCalendarOption for ISO format or Intl.DateTimeFormatOptions for locale formatting
       * @returns The formatted date string
       *
       * @example
       * // ISO format (default)
       * Temporal.PlainDate.from("2024-01-15").toString() //=> "2024-01-15"
       *
       * @example
       * // With locale formatting
       * Temporal.PlainDate.from("2024-01-15").toString({ month: "long", year: "numeric" }) //=> "January 2024"
       */
      toString(options?: Temporal.ShowCalendarOption | Intl.DateTimeFormatOptions): string;
    }
  }
}

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

Temporal.PlainDate.prototype.toString = function (
  options?: Temporal.ShowCalendarOption | Intl.DateTimeFormatOptions,
): string {
  if (options && isDateTimeFormatOptions(options)) {
    return this.toLocaleString("en-US", options);
  }
  return originalToString.call(this, options as Temporal.ShowCalendarOption);
};
