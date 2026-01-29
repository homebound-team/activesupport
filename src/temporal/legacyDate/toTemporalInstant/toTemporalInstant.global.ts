import { Temporal, toTemporalInstant } from "temporal-polyfill";

declare global {
  interface Date {
    /**
     * Converts the legacy Date object to a Temporal.Instant.
     * This method is part of the Temporal spec and will be added in native implementations automatically.
     * An Instant represents a fixed point in time with nanosecond precision.
     * @returns A Temporal.Instant representing this Date's point in time
     * @example new Date("2023-05-02T12:00:00Z").toTemporalInstant() //=> Temporal.Instant
     */
    toTemporalInstant(): Temporal.Instant;
  }
}

Date.prototype.toTemporalInstant = toTemporalInstant;
