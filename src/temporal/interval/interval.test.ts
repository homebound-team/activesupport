import { newPD, newPDInterval, newZDT, newZDTInterval } from "src/temporal/setupTests";

describe("Interval", () => {
  describe("eachMonth", () => {
    it("returns each month in the interval", () => {
      const interval = newPDInterval("2024-01-15", "2024-04-10");
      const result = interval.eachMonth();
      expect(result).toEqual([newPD("2024-01-01"), newPD("2024-02-01"), newPD("2024-03-01"), newPD("2024-04-01")]);
    });

    it("returns a single month when start and end are in the same month", () => {
      const interval = newPDInterval("2024-01-10", "2024-01-20");
      const result = interval.eachMonth();
      expect(result).toEqual([newPD("2024-01-01")]);
    });

    it("returns an empty array when step is 0", () => {
      const interval = newPDInterval("2024-01-15", "2024-04-10");
      const result = interval.eachMonth({ step: 0 });
      expect(result).toEqual([]);
    });

    it("supports a positive step to skip months", () => {
      const interval = newPDInterval("2024-01-15", "2024-06-10");
      const result = interval.eachMonth({ step: 2 });
      expect(result).toEqual([newPD("2024-01-01"), newPD("2024-03-01"), newPD("2024-05-01")]);
    });

    it("reverses the result when step is negative", () => {
      const interval = newPDInterval("2024-01-15", "2024-04-10");
      const result = interval.eachMonth({ step: -1 });
      expect(result).toEqual([newPD("2024-04-01"), newPD("2024-03-01"), newPD("2024-02-01"), newPD("2024-01-01")]);
    });

    it("handles reversed intervals (start > end)", () => {
      const interval = newPDInterval("2024-04-10", "2024-01-15");
      const result = interval.eachMonth();
      expect(result).toEqual([newPD("2024-04-01"), newPD("2024-03-01"), newPD("2024-02-01"), newPD("2024-01-01")]);
    });

    it("works with ZonedDateTime", () => {
      const interval = newZDTInterval("2024-01-15T00:00:00.000Z", "2024-03-10T00:00:00.000Z");
      const result = interval.eachMonth();
      expect(result).toHaveLength(3);
    });
  });

  describe("eachWeek", () => {
    it("returns each week in the interval", () => {
      // Default weekStartsOn is Sunday (7), so dates snap to Sundays
      const interval = newPDInterval("2023-12-31", "2024-01-21");
      const result = interval.eachWeek();
      expect(result).toEqual([newPD("2023-12-31"), newPD("2024-01-07"), newPD("2024-01-14"), newPD("2024-01-21")]);
    });

    it("returns an empty array when step is 0", () => {
      const interval = newPDInterval("2023-12-31", "2024-01-21");
      const result = interval.eachWeek({ step: 0 });
      expect(result).toEqual([]);
    });

    it("supports a positive step to skip weeks", () => {
      const interval = newPDInterval("2023-12-31", "2024-01-21");
      const result = interval.eachWeek({ step: 2 });
      expect(result).toEqual([newPD("2023-12-31"), newPD("2024-01-14")]);
    });

    it("reverses the result when step is negative", () => {
      const interval = newPDInterval("2023-12-31", "2024-01-14");
      const result = interval.eachWeek({ step: -1 });
      expect(result).toEqual([newPD("2024-01-14"), newPD("2024-01-07"), newPD("2023-12-31")]);
    });

    it("supports weekStartsOn option", () => {
      // 2024-01-03 is a Wednesday
      // Default (Sunday): startOfWeek = 2023-12-31
      // weekStartsOn: 1 (Monday): startOfWeek = 2024-01-01
      const interval = newPDInterval("2024-01-03", "2024-01-10");
      const resultDefault = interval.eachWeek();
      const resultMonday = interval.eachWeek({ weekStartsOn: 1 });
      expect(resultDefault[0]).toEqual(newPD("2023-12-31"));
      expect(resultMonday[0]).toEqual(newPD("2024-01-01"));
    });

    it("handles reversed intervals (start > end)", () => {
      const interval = newPDInterval("2024-01-21", "2023-12-31");
      const result = interval.eachWeek();
      expect(result).toEqual([newPD("2024-01-21"), newPD("2024-01-14"), newPD("2024-01-07"), newPD("2023-12-31")]);
    });

    it("works with ZonedDateTime", () => {
      const interval = newZDTInterval("2023-12-31T00:00:00.000Z", "2024-01-14T00:00:00.000Z");
      const result = interval.eachWeek();
      expect(result).toHaveLength(3);
    });
  });

  describe("contains", () => {
    it("returns true when the date is within the interval", () => {
      const interval = newPDInterval("2024-01-01", "2024-01-31");
      expect(interval.contains(newPD("2024-01-15"))).toBe(true);
    });

    it("returns false when the date is outside the interval", () => {
      const interval = newPDInterval("2024-01-01", "2024-01-31");
      expect(interval.contains(newPD("2024-02-15"))).toBe(false);
    });

    it("includes boundaries by default", () => {
      const interval = newPDInterval("2024-01-01", "2024-01-31");
      expect(interval.contains(newPD("2024-01-01"))).toBe(true);
      expect(interval.contains(newPD("2024-01-31"))).toBe(true);
    });

    it("excludes boundaries when excludeBoundaries is true", () => {
      const interval = newPDInterval("2024-01-01", "2024-01-31");
      expect(interval.contains(newPD("2024-01-01"), { excludeBoundaries: true })).toBe(false);
      expect(interval.contains(newPD("2024-01-31"), { excludeBoundaries: true })).toBe(false);
      expect(interval.contains(newPD("2024-01-15"), { excludeBoundaries: true })).toBe(true);
    });

    it("handles reversed intervals", () => {
      const interval = newPDInterval("2024-01-31", "2024-01-01");
      expect(interval.contains(newPD("2024-01-15"))).toBe(true);
    });

    it("works with ZonedDateTime", () => {
      const interval = newZDTInterval("2024-01-01T00:00:00.000Z", "2024-01-31T00:00:00.000Z");
      expect(interval.contains(newZDT("2024-01-15T00:00:00.000Z"))).toBe(true);
      expect(interval.contains(newZDT("2024-02-15T00:00:00.000Z"))).toBe(false);
    });
  });
});
