import { WeekOptions } from "src/temporal/utils";
import { startOfDayOpts } from "src/temporal/zonedDateTime/startOfDay/startOfDay.impl";
import { Temporal } from "temporal-polyfill";

export function startOfWeekImpl(this: Temporal.ZonedDateTime, options: WeekOptions = {}): Temporal.ZonedDateTime {
  const { dayOfWeek, daysInWeek } = this;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? daysInWeek : 0) + dayOfWeek - weekStartsOn;
  return this.subtract({ days }).with(startOfDayOpts);
}

export function startOfWeek(date: Temporal.ZonedDateTime, options: WeekOptions = {}): Temporal.ZonedDateTime {
  return startOfWeekImpl.call(date, options);
}
