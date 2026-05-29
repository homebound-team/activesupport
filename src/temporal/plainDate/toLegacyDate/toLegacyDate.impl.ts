type TimeZoneAndTime =
  | Temporal.TimeZoneLike
  | { timeZone: Temporal.TimeZoneLike; plainTime?: Temporal.PlainTime | string };

/**
 * Converts a PlainDate to a legacy JavaScript Date object in the specified timezone.
 * This function first converts the PlainDate to a ZonedDateTime using the provided timezone,
 * then extracts the epoch milliseconds to create the Date.
 * @param date - The PlainDate to convert
 * @param tzLike - A timezone identifier (e.g., "America/New_York", "UTC") or a PlainTime/object with timezone info
 * @returns A legacy Date representing the PlainDate at midnight in the specified timezone
 * @example
 * toLegacyDate(Temporal.PlainDate.from("2023-05-02"), "America/New_York")
 * //=> Date("2023-05-02T04:00:00.000Z")
 * @example
 * toLegacyDate(Temporal.PlainDate.from("2023-05-02"), "UTC")
 * //=> Date("2023-05-02T00:00:00.000Z")
 */
export function toLegacyDate(date: Temporal.PlainDate, tzLike: TimeZoneAndTime): Date {
  const zdt =
    typeof tzLike === "string" || tzLike instanceof Temporal.ZonedDateTime
      ? date.toZonedDateTime(tzLike)
      : date.toZonedDateTime(tzLike);
  return new Date(zdt.epochMilliseconds);
}
