import { newZDT } from "../setupTests";

describe("endOfYear", () => {
  it("returns the date with the time set to 23:59:59.999 and the date set to the last day of a year", () => {
    const date = newZDT("2014-09-02T11:55:00.000Z");
    const result = date.endOfYear();
    expect(result).toEqual(newZDT("2014-12-31T23:59:59.999Z"));
  });
});
