import { newZDT } from "../setupTests";

describe("isMonday", () => {
  it("returns true if the given date is Monday", () => {
    const result = newZDT("2014-09-22T00:00:00.000Z").isMonday;
    expect(result).toBe(true);
  });

  it("returns false if the given date is not Monday", () => {
    const result = newZDT("2014-09-25T00:00:00.000Z").isMonday;
    expect(result).toBe(false);
  });
});
