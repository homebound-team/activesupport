import { startOfDay } from "./startOfDay.impl";

declare global {
  namespace Temporal {
    interface ZonedDateTime {
      startOfDay(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.startOfDay = function (this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return startOfDay(this);
};
