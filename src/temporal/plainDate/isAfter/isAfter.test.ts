import { newPD } from "src/temporal/setupTests";
import { isAfter } from "./isAfter.impl";

describe("isAfter", () => {
  it("returns true if the first date is after the second one", () => {
    const result = isAfter(newPD("1989-07-10"), newPD("1987-02-11"));
    expect(result).toBe(true);
  });

  it("returns false if the first date is before the second one", () => {
    const result = isAfter(newPD("1987-02-11"), newPD("1989-06-10"));
    expect(result).toBe(false);
  });

  it("returns false if the first date is equal to the second one", () => {
    const result = isAfter(newPD("1989-07-10"), newPD("1989-07-10"));
    expect(result).toBe(false);
  });
});
