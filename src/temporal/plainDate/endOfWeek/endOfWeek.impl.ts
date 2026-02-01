import { WeekOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function endOfWeek(date: Temporal.PlainDate, options: WeekOptions = {}): Temporal.PlainDate {
  const { dayOfWeek, daysInWeek } = date;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? -daysInWeek : 0) + 6 - (dayOfWeek - weekStartsOn);
  return date.add({ days });
}
