import { oneTo } from "src/utils";
import { Temporal } from "temporal-polyfill";

export const [isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday] = oneTo(
  7,
  (dayOfWeek) => (date: Temporal.ZonedDateTime) => date.dayOfWeek === dayOfWeek,
);
