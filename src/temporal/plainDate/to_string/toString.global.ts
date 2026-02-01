import { Temporal } from "temporal-polyfill";
import { toString } from "./toString.impl";

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

Temporal.PlainDate.prototype.toString = function (
  this: Temporal.PlainDate,
  options?: Temporal.ShowCalendarOption | Intl.DateTimeFormatOptions,
): string {
  return toString(this, options);
};
