import { endOfDay } from "./endOfDay.impl";

declare global {
  namespace Temporal {
    interface ZonedDateTime {
      endOfDay(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.endOfDay = function (this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return endOfDay(this);
};
