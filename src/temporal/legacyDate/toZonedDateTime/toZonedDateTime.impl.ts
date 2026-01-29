import { Temporal, toTemporalInstant } from "temporal-polyfill";

export function toZonedDateTimeImpl(this: Date, tzLike: Temporal.TimeZoneLike) {
  return toTemporalInstant.call(this).toZonedDateTimeISO(tzLike);
}

export function toZonedDateTime(date: Date, tzLike: Temporal.TimeZoneLike) {
  return toZonedDateTimeImpl.call(date, tzLike);
}
