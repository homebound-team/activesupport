import { Temporal, toTemporalInstant } from "temporal-polyfill";

export function toPlainDate(date: Date, tzLike: Temporal.TimeZoneLike) {
  return toTemporalInstant.call(date).toZonedDateTimeISO(tzLike).toPlainDate();
}
