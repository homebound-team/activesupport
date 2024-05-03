import { Temporal } from "temporal-polyfill";

declare module "temporal-polyfill" {
  namespace Temporal {
    class Interval<T extends Temporal.PlainDate | Temporal.ZonedDateTime> {
      static from<T extends Temporal.PlainDate | Temporal.ZonedDateTime>(start: T, end: T): Interval<T>;

      readonly start: T;
      readonly end: T;

      constructor(start: T, end: T);

      eachMonth(options?: { step: number }): T[];
      eachWeek(options?: { step?: number; weekStartsOn?: number }): T[];
      contains(value: T, options?: { excludeBoundaries?: boolean }): boolean;
    }
  }
}

Temporal.Interval = class<T extends Temporal.PlainDate | Temporal.ZonedDateTime> {
  static from<T extends Temporal.PlainDate | Temporal.ZonedDateTime>(start: T, end: T): Temporal.Interval<T> {
    return new Temporal.Interval(start, end);
  }

  constructor(
    public readonly start: T,
    public readonly end: T,
  ) {}

  private get isReversed() {
    return this.start.isAfter(this.end as any);
  }

  eachMonth(options?: { step: number }): T[] {
    let reversed = this.isReversed;
    const end = reversed ? this.start : this.end;
    let current = (reversed ? this.end : this.start).startOfMonth();

    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates: T[] = [];

    while (current.isBefore(end as any) || current.equals(end as any)) {
      dates.push(current as any);
      current = current.add({ months: step });
    }

    return reversed ? dates.reverse() : dates;
  }

  eachWeek(options: { step?: number; weekStartsOn?: number } = {}): T[] {
    let reversed = this.isReversed;
    const start = (reversed ? this.end : this.start).startOfWeek(options);
    const end = (reversed ? this.start : this.end).startOfWeek(options);

    let current = start;

    let { step = 1 } = options;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }

    const dates: T[] = [];
    while (current.isBefore(end as any) || current.equals(end as any)) {
      dates.push(current as any);
      current = current.add({ weeks: step });
    }

    return reversed ? dates.reverse() : dates;
  }

  contains(value: T, opts: { excludeBoundaries?: boolean } = {}) {
    const { excludeBoundaries = false } = opts;
    const [start, end] = this.isReversed ? [this.end, this.start] : [this.start, this.end];
    return excludeBoundaries
      ? value.isAfter(start as any) && value.isBefore(end as any)
      : !value.isBefore(start as any) && !value.isAfter(end as any);
  }
};
