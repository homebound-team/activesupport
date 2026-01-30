import { WeekOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function startOfWeekImpl(this: Temporal.PlainDate, options: WeekOptions = {}): Temporal.PlainDate {
  const { dayOfWeek, daysInWeek } = this;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? daysInWeek : 0) + dayOfWeek - weekStartsOn;
  return this.subtract({ days });
}

export function startOfWeek(date: Temporal.PlainDate, options: WeekOptions = {}): Temporal.PlainDate {
  return startOfWeekImpl.call(date, options);
}
