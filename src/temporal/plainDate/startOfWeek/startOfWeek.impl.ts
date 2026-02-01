import { WeekOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function startOfWeek(date: Temporal.PlainDate, options: WeekOptions = {}): Temporal.PlainDate {
  const { dayOfWeek, daysInWeek } = date;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? daysInWeek : 0) + dayOfWeek - weekStartsOn;
  return date.subtract({ days });
}
