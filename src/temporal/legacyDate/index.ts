import { Temporal, toTemporalInstant } from "temporal-polyfill";

declare global {
  interface Date {
    toInstant(): Temporal.Instant;
    toZonedDateTime(tzLike: Temporal.TimeZoneLike): Temporal.ZonedDateTime;
    toPlainDate(tzLike: Temporal.TimeZoneLike): Temporal.PlainDate;
  }
}

Date.prototype.toInstant = function () {
  return toTemporalInstant.call(this);
};

Date.prototype.toZonedDateTime = function (tzLike: Temporal.TimeZoneLike) {
  return toTemporalInstant.call(this).toZonedDateTimeISO(tzLike);
};

Date.prototype.toPlainDate = function (tzLike: Temporal.TimeZoneLike) {
  return toTemporalInstant.call(this).toZonedDateTimeISO(tzLike).toPlainDate();
};
