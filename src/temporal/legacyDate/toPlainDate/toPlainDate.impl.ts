import { Temporal, toTemporalInstant } from "temporal-polyfill";

export function toPlainDateImpl(this: Date, tzLike: Temporal.TimeZoneLike) {
  return toTemporalInstant.call(this).toZonedDateTimeISO(tzLike).toPlainDate();
}

export function toPlainDate(date: Date, tzLike: Temporal.TimeZoneLike) {
  return toPlainDateImpl.call(date, tzLike);
}
