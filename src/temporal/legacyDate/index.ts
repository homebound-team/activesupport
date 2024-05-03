import { Temporal, toTemporalInstant } from "temporal-polyfill";

declare global {
  interface Date {
    // This method is part of the Temporal spec and will be added in native implementations automatically
    toTemporalInstant(): Temporal.Instant;
    toZonedDateTime(tzLike: Temporal.TimeZoneLike): Temporal.ZonedDateTime;
    toPlainDate(tzLike: Temporal.TimeZoneLike): Temporal.PlainDate;
  }
}

Date.prototype.toTemporalInstant = toTemporalInstant;

Date.prototype.toZonedDateTime = function (tzLike: Temporal.TimeZoneLike) {
  return this.toTemporalInstant().toZonedDateTimeISO(tzLike);
};

Date.prototype.toPlainDate = function (tzLike: Temporal.TimeZoneLike) {
  return this.toTemporalInstant().toZonedDateTimeISO(tzLike).toPlainDate();
};
