import { Temporal, toTemporalInstant } from "temporal-polyfill";

export function toZonedDateTime(date: Date, tzLike: Temporal.TimeZoneLike) {
  return toTemporalInstant.call(date).toZonedDateTimeISO(tzLike);
}
