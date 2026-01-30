import { fail } from "src/utils";

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
