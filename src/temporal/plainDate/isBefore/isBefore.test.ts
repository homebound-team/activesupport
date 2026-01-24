import { newPD } from "../setupTests";
import "./index";

describe("isBefore", () => {
  it("returns true if the first date is before the second one", () => {
    const result = newPD("1987-02-11").isBefore(newPD("1989-07-10"));
    expect(result).toBe(true);
  });

  it("returns false if the first date is after the second one", () => {
    const result = newPD("1989-07-10").isBefore(newPD("1987-02-11"));
    expect(result).toBe(false);
  });

  it("returns false if the first date is equal to the second one", () => {
    const result = newPD("1989-07-10").isBefore(newPD("1989-07-10"));
    expect(result).toBe(false);
  });
});
