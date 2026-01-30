import { WeekOptions } from "src/temporal/utils";
import { Temporal } from "temporal-polyfill";

export function endOfWeekImpl(this: Temporal.PlainDate, options: WeekOptions = {}): Temporal.PlainDate {
  const { dayOfWeek, daysInWeek } = this;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? -daysInWeek : 0) + 6 - (dayOfWeek - weekStartsOn);
  return this.add({ days });
}

export function endOfWeek(date: Temporal.PlainDate, options?: WeekOptions): Temporal.PlainDate {
  return endOfWeekImpl.call(date, options);
}
