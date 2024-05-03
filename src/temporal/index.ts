import { Temporal } from "temporal-polyfill";
import "./interval";
import "./legacyDate";
import "./plainDate";
import "./zonedDateTime";

declare module "temporal-polyfill" {
  namespace Temporal {
    type BusinessDayOptions = {
      businessDays?: number[];
      // ISO 8601 Date format
      exceptions?: Record<string, boolean>;
    };

    interface WeekOptions {
      /** Which day the week starts on. */
      weekStartsOn?: number;
    }
  }
}

export function withValidBusinessDays<T>(options: T & { businessDays?: number[] }): T & { businessDays: number[] } {
  if (options.businessDays === undefined) return { ...options, businessDays: [1, 2, 3, 4, 5] };
  if (options.businessDays.every((number) => number >= 1 && number <= 7)) return options as any;
  // Throw a RangeError if businessDays includes a number outside of 1-7
  throw new RangeError("business days must be between 1 and 7");
}
