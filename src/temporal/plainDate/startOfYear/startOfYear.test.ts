import { newPD } from "../setupTests";
import "./index";

describe("startOfYear", () => {
  it("returns the date with the time set to 00:00:00 and the date set to the first day of a year", () => {
    const date = newPD("2014-09-02");
    const result = date.startOfYear();
    expect(result).toEqual(newPD("2014-01-01"));
  });

  it("handles dates before 100 AD", () => {
    const initialDate = newPD("0009-01-05");
    const expectedResult = newPD("0009-01-01");
    const result = initialDate.startOfYear();
    expect(result).toEqual(expectedResult);
  });
});
