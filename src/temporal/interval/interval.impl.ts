import { isAfter as isAfterPD } from "src/temporal/plainDate/isAfter/isAfter.impl";
import { isBefore as isBeforePD } from "src/temporal/plainDate/isBefore/isBefore.impl";
import { startOfMonth as startOfMonthPd } from "src/temporal/plainDate/startOfMonth/startOfMonth.impl";
import { startOfWeek as startOfWeekPD } from "src/temporal/plainDate/startOfWeek/startOfWeek.impl";
import { isAfter as isAfterZDT } from "src/temporal/zonedDateTime/isAfter/isAfter.impl";
import { isBefore as isBeforeZDT } from "src/temporal/zonedDateTime/isBefore/isBefore.impl";
import { startOfMonth as startOfMonthZDT } from "src/temporal/zonedDateTime/startOfMonth/startOfMonth.impl";
import { startOfWeek as startOfWeekZDT } from "src/temporal/zonedDateTime/startOfWeek/startOfWeek.impl";
import { Temporal } from "temporal-polyfill";

export class Interval<T extends Temporal.PlainDate | Temporal.ZonedDateTime> {
  static from<T extends Temporal.PlainDate | Temporal.ZonedDateTime>(start: T, end: T): Interval<T> {
    return new Interval(start, end);
  }

  constructor(
    public readonly start: T,
    public readonly end: T,
  ) {}

  private get isReversed() {
    return isAfter(this.start, this.end);
  }

  eachMonth(options?: { step: number }): T[] {
    let reversed = this.isReversed;

    let [current, end] = (reversed ? [this.end, this.start] : [this.start, this.end]) as [T, T];

    current = (current instanceof Temporal.PlainDate ? startOfMonthPd(current) : startOfMonthZDT(current)) as T;

    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates: T[] = [];

    while (isBefore(current, end) || isEqual(current, end)) {
      dates.push(current);
      current = current.add({ months: step }) as T;
    }

    return reversed ? dates.reverse() : dates;
  }

  eachWeek(options: { step?: number; weekStartsOn?: number } = {}): T[] {
    let reversed = this.isReversed;
    let [current, end] = (reversed ? [this.end, this.start] : [this.start, this.end]).map(
      (value) =>
        (value instanceof Temporal.PlainDate ? startOfWeekPD(value, options) : startOfWeekZDT(value, options)) as T,
    );

    let { step = 1 } = options;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates: T[] = [];
    while (isBefore(current, end) || isEqual(current, end as T)) {
      dates.push(current);
      current = current.add({ weeks: step }) as T;
    }

    return reversed ? dates.reverse() : dates;
  }

  contains(value: T, opts: { excludeBoundaries?: boolean } = {}) {
    const { excludeBoundaries = false } = opts;
    const [start, end] = this.isReversed ? [this.end, this.start] : [this.start, this.end];
    return excludeBoundaries
      ? isAfter(value, start) && isBefore(value, end)
      : !isBefore(value, start) && !isAfter(value, end);
  }
}

function isAfter<T extends Temporal.PlainDate | Temporal.ZonedDateTime>(a: T, b: T) {
  if (a instanceof Temporal.PlainDate) {
    return isAfterPD(a, b as any);
  } else {
    return isAfterZDT(a, b as any);
  }
}

function isBefore<T extends Temporal.PlainDate | Temporal.ZonedDateTime>(a: T, b: T) {
  if (a instanceof Temporal.PlainDate) {
    return isBeforePD(a, b as any);
  } else {
    return isBeforeZDT(a, b as any);
  }
}

function isEqual<T extends Temporal.PlainDate | Temporal.ZonedDateTime>(a: T, b: T) {
  if (a instanceof Temporal.PlainDate) {
    return a.equals(b as any);
  } else {
    return a.epochMilliseconds === (b as any).epochMilliseconds;
  }
}
