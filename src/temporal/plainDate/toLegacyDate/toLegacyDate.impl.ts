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
  // TS 6 splits toZonedDateTime into two overloads (TimeZoneLike vs options object) and
  // can't dispatch overload resolution on a union argument; the cast picks one but the
  // call is structurally valid for either at runtime.
  return new Date(date.toZonedDateTime(tzLike as Temporal.TimeZoneLike).epochMilliseconds);
}
