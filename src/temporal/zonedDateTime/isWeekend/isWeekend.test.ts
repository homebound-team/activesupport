import { newZDT } from "src/temporal/setupTests";
import { isWeekend } from "./isWeekend.impl";

describe("isWeekend", () => {
  it("returns true if the given date is in a weekend", () => {
    const result = isWeekend(newZDT("2014-10-05T00:00:00.000Z"));
    expect(result).toBe(true);
  });

  it("returns false if the given date is not in a weekend", () => {
    const result = isWeekend(newZDT("2014-10-06T00:00:00.000Z"));
    expect(result).toBe(false);
  });

  it("returns false if the given date is overridden to not be a weekend", () => {
    // Sunday (dayOfWeek 7) is normally a weekend, but with businessDays including 7 it's not
    const result = isWeekend(newZDT("2014-10-05T00:00:00.000Z"), { businessDays: [1, 2, 3, 4, 5, 7] });
    expect(result).toBe(false);
  });

  it("returns true if the given date is overridden to be a weekend", () => {
    // Monday (dayOfWeek 1) is normally not a weekend, but with businessDays excluding 1 it is
    const result = isWeekend(newZDT("2014-10-06T00:00:00.000Z"), { businessDays: [2, 3, 4, 5, 6, 7] });
    expect(result).toBe(true);
  });
});
