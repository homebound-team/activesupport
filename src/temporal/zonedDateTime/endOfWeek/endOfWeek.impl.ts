import { endOfDayOpts } from "src/temporal/zonedDateTime/endOfDay/endOfDay.impl";
import { Temporal } from "temporal-polyfill";

export function endOfWeekImpl(
  this: Temporal.ZonedDateTime,
  options: Temporal.WeekOptions = {},
): Temporal.ZonedDateTime {
  const { dayOfWeek, daysInWeek } = this;
  const { weekStartsOn = daysInWeek } = options;
  const days = (dayOfWeek < weekStartsOn ? -daysInWeek : 0) + 6 - (dayOfWeek - weekStartsOn);
  return this.add({ days }).with(endOfDayOpts);
}

export function endOfWeek(date: Temporal.ZonedDateTime, options: Temporal.WeekOptions = {}): Temporal.ZonedDateTime {
  return endOfWeekImpl.call(date, options);
}
