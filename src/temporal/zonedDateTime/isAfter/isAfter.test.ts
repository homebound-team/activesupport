import { newZDT } from "../setupTests";

describe("isAfter", () => {
  it("returns true if the first date is after the second one", () => {
    const result = newZDT("1989-07-10T00:00:00.000Z").isAfter(newZDT("1987-02-11T00:00:00.000Z"));
    expect(result).toBe(true);
  });

  it("returns false if the first date is before the second one", () => {
    const result = newZDT("1987-02-11T00:00:00.000Z").isAfter(newZDT("1989-07-10T00:00:00.000Z"));
    expect(result).toBe(false);
  });

  it("returns false if the first date is equal to the second one", () => {
    const result = newZDT("1989-07-10T00:00:00.000Z").isAfter(newZDT("1989-07-10T00:00:00.000Z"));
    expect(result).toBe(false);
  });
});
