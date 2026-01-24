import { newZDT } from "../setupTests";

describe("isWeekend", () => {
  it("returns true if the given date is in a weekend", () => {
    const result = newZDT("2014-10-05T00:00:00.000Z").isWeekend();
    expect(result).toBe(true);
  });

  it("returns false if the given date is not in a weekend", () => {
    const result = newZDT("2014-10-06T00:00:00.000Z").isWeekend();
    expect(result).toBe(false);
  });
});
