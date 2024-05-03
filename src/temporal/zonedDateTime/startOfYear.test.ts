import { newZDT } from "../setupTests";

describe("startOfYear", () => {
  it("returns the date with the time set to 00:00:00 and the date set to the first day of a year", () => {
    const date = newZDT("2014-09-02T11:55:00.000Z");
    const result = date.startOfYear();
    expect(result).toEqual(newZDT("2014-01-01T00:00:00.000Z"));
  });

  it("handles dates before 100 AD", () => {
    const initialDate = newZDT("0009-01-05T00:00:00.000Z");
    const expectedResult = newZDT("0009-01-01T00:00:00.000Z");
    const result = initialDate.startOfYear();
    expect(result).toEqual(expectedResult);
  });
});
