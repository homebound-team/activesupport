import { newZDT } from "src/temporal/setupTests";
import { isMonday } from "./isDayOfWeek.impl";

describe("isMonday", () => {
  it("returns true if the given date is Monday", () => {
    const result = isMonday(newZDT("2014-09-22T00:00:00.000Z"));
    expect(result).toBe(true);
  });

  it("returns false if the given date is not Monday", () => {
    const result = isMonday(newZDT("2014-09-25T00:00:00.000Z"));
    expect(result).toBe(false);
  });
});
