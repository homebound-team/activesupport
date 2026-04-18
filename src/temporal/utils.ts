import { fail } from "src/utils";
import { Temporal } from "temporal-polyfill";

export type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type BusinessDayOptions = {
  businessDays?: DayOfWeek[];
  // ISO 8601 Date format
  exceptions?: Record<string, boolean>;
};

export interface WeekOptions {
  /** Which day the week starts on. */
  weekStartsOn?: number;
}

const validSymbol = Symbol("valid");
/**
 * Validates and normalizes business day options for Temporal date operations.
 * If businessDays is undefined, defaults to [1, 2, 3, 4, 5] (Monday-Friday).
 * If businessDays is provided, validates that all values are between 1-7 (ISO weekdays).
 * @template T The options type being validated
 * @param options An options object that may contain a businessDays array
 * @throws RangeError if any businessDay value is outside the range 1-7
 * @example
 * assertValidBusinessDays({}) //=> { businessDays: [1, 2, 3, 4, 5] }
 * assertValidBusinessDays({ businessDays: [1, 2, 3] }) //=> { businessDays: [1, 2, 3] }
 * assertValidBusinessDays({ businessDays: [0, 8] }) //=> throws RangeError
 */
export function assertValidBusinessDays<T>(
  options: T & { businessDays?: DayOfWeek[] },
): asserts options is T & { businessDays: DayOfWeek[] } {
  // This function might be called in a loop, so we add the symbol to the options once we've verified it's valid
  // so we don't need to do it multiple times
  if (validSymbol in options) return;

  if (options.businessDays?.length === 0) {
    fail("businessDays must contain at least one day of the week (1-7)");
  }

  if (options.businessDays?.some((number) => number < 1 || number > 7)) {
    fail(RangeError, "businessDays must be between 1 and 7");
  }

  options.businessDays ??= [1, 2, 3, 4, 5];
  options[validSymbol] = true;
}

/**
 * Generates a Temporal.PlainDate for the current date in UTC.  Currently unused but added for uniformity.
 */
export function todayUTC() {
  return Temporal.Now.plainDateISO("UTC");
}

/**
 * Generates a Temporal.PlainDate for the current date in the Pacific time zone.  Should be used when setting a field that
 * will become a date in the database or when calculating dates for a user with an unknown time zone.
 */
export function todayPT() {
  return Temporal.Now.plainDateISO("America/Los_Angeles");
}

/**
 * Generates a Temporal.ZonedDateTime for the current time in UTC.  Should be used when setting a field that will become
 * a timestamptz in the database.
 */
export function nowUTC() {
  return Temporal.Now.zonedDateTimeISO("UTC");
}

/**
 * Generates a Temporal.ZonedDateTime for the current time in the Pacific time zone.  Should be used when calculating
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

/**
 * Converts a string representation of a date-time with time zone information into a Temporal.ZonedDateTime object.
 * Used for parsing date-time strings that include time zone information.
 * @param value - The date-time string in ISO 8601 format with time zone (e.g., "2024-02-14T12:00:00Z[UTC]")
 * @returns A Temporal.ZonedDateTime object representing the input date-time with time zone
 */
export function zdt(value: string): Temporal.ZonedDateTime;
/**
 * Converts a number representing epochMilliseconds into a Temporal.ZonedDateTime object.
 * Used for parsing raw epoch millisecond timestamps that do not include time zone information.
 * @param value - The timestamp in milliseconds since the epoch (e.g., 1768408183709)
 * @param tz - The time zone to use for the resulting ZonedDateTime. Defaults to UTC.
 * @returns A Temporal.ZonedDateTime object representing the input timestamp in the specified time zone
 */
export function zdt(value: number, tz?: Temporal.TimeZoneLike): Temporal.ZonedDateTime;
export function zdt(value: string | number, tz?: Temporal.TimeZoneLike) {
  return typeof value === "string"
    ? Temporal.ZonedDateTime.from(value)
    : Temporal.Instant.fromEpochMilliseconds(value).toZonedDateTimeISO(tz ?? "UTC");
}

/**
 * Returns a Temporal.Instant for the current moment. Equivalent to `Temporal.Now.instant()`.
 * @returns A Temporal.Instant for the current moment
 */
export function instant(): Temporal.Instant;
/**
 * Parses a value into a Temporal.Instant.
 * @param value An ISO 8601 instant string (e.g. "2024-02-14T12:00:00Z") or epoch milliseconds
 * @returns A Temporal.Instant representing the input value
 */
export function instant(value: string | number): Temporal.Instant;
export function instant(value?: string | number): Temporal.Instant {
  return value === undefined
    ? Temporal.Now.instant()
    : typeof value === "string"
      ? Temporal.Instant.from(value)
      : Temporal.Instant.fromEpochMilliseconds(value);
}
