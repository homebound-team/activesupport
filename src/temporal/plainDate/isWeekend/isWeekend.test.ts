import { newPD } from "../setupTests";
import "./index";

describe("isWeekend", () => {
  it("returns true if the given date is in a weekend", () => {
    const result = newPD("2014-10-05").isWeekend();
    expect(result).toBe(true);
  });

  it("returns false if the given date is overridden to be not be a weekend", () => {
    const result = newPD("2014-10-05").isWeekend({ businessDays: [1, 2, 3, 4, 5, 7] });
    expect(result).toBe(false);
  });

  it("returns false if the given date is not in a weekend", () => {
    const result = newPD("2014-10-06").isWeekend();
    expect(result).toBe(false);
  });

  it("returns true if the given date is overridden to be a weekend", () => {
    const result = newPD("2014-10-06").isWeekend({ businessDays: [2, 3, 4, 5, 6, 7] });
    expect(result).toBe(true);
  });
});
