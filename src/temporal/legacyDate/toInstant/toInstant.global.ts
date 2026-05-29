import { toInstant } from "./toInstant.impl";

declare global {
  interface Date {
    /**
     * Converts the legacy Date object to a Temporal.Instant.
     * An Instant represents a fixed point in time with nanosecond precision.
     * @returns A Temporal.Instant representing this Date's point in time
     * @example new Date("2023-05-02T12:00:00Z").toInstant() //=> Temporal.Instant
     */
    toInstant(): Temporal.Instant;
  }
}

Date.prototype.toInstant = function (this: Date): Temporal.Instant {
  return toInstant(this);
};
