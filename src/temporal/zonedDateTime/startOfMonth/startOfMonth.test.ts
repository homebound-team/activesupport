import { newZDT } from "../setupTests";

describe("startOfMonth", () => {
  it("returns the date with the time set to 00:00:00 and the date set to the first day of a month", () => {
    const date = newZDT("2014-09-02T11:55:00.000Z");
    const result = date.startOfMonth();
    expect(result).toEqual(newZDT("2014-09-01T00:00:00.000Z"));
  });
});
