import { Temporal } from "temporal-polyfill";
import { endOfDay } from "./endOfDay.impl";

declare module "temporal-polyfill" {
  namespace Temporal {
    interface ZonedDateTime {
      endOfDay(): Temporal.ZonedDateTime;
    }
  }
}

Temporal.ZonedDateTime.prototype.endOfDay = function (this: Temporal.ZonedDateTime): Temporal.ZonedDateTime {
  return endOfDay(this);
};
