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

/**
 * Validates and normalizes business day options for Temporal date operations.
 * If businessDays is undefined, defaults to [1, 2, 3, 4, 5] (Monday-Friday).
 * If businessDays is provided, validates that all values are between 1-7 (ISO weekdays).
 * @template T The options type being validated
 * @param options An options object that may contain a businessDays array
 * @returns The options object with a validated businessDays array
 * @throws RangeError if any businessDay value is outside the range 1-7
 * @example
 * withValidBusinessDays({}) //=> { businessDays: [1, 2, 3, 4, 5] }
 * withValidBusinessDays({ businessDays: [1, 2, 3] }) //=> { businessDays: [1, 2, 3] }
 * withValidBusinessDays({ businessDays: [0, 8] }) //=> throws RangeError
 */
export function withValidBusinessDays<T>(options: T & { businessDays?: number[] }): T & { businessDays: number[] } {
  if (options.businessDays === undefined) return { ...options, businessDays: [1, 2, 3, 4, 5] };
  if (options.businessDays.every((number) => number >= 1 && number <= 7)) return options as any;
  // Throw a RangeError if businessDays includes a number outside of 1-7
  throw new RangeError("business days must be between 1 and 7");
}

/**
 * Generates a Temporal.PlainDate for the current date in UTC. Currently unused but added for uniformity.
 */
export function todayUTC() {
  return Temporal.Now.plainDateISO("UTC");
}

/**
 * Generates a Temporal.PlainDate for the current date in the Pacific time zone. Should be used when setting a field that
 * will become a date in the database or when calculating dates for a user with an unknown time zone.
 */
export function todayPT() {
  return Temporal.Now.plainDateISO("America/Los_Angeles");
}

/**
 * Generates a Temporal.ZonedDateTime for the current time in UTC. Should be used when setting a field that will become
 * a timestamptz in the database.
 */
export function nowUTC() {
  return Temporal.Now.zonedDateTimeISO("UTC");
}

/**
 * Generates a Temporal.ZonedDateTime for the current time in the Pacific time zone. Should be used when calculating
 * times for a user with an unknown time zone that involves date time boundaries (eg, startOfDay / startOfWeek).
 */
export function nowPT() {
  return Temporal.Now.zonedDateTimeISO("America/Los_Angeles");
}

/**
 * Converts a string date representation into a Temporal.PlainDate object.
 * Used for parsing date strings in a calendar-independent way without time zone information.
 * @param value - The date string in ISO 8601 format (e.g., "2024-02-14")
 * @returns A Temporal.PlainDate object representing the input date
 */
export function plainDate(value: string) {
  return Temporal.PlainDate.from(value);
}
