import { newPD } from "../setupTests";
import "./index";

describe("endOfYear", () => {
  it("returns a date set to the last day of a year", () => {
    const date = newPD("2014-09-20");
    const result = date.endOfYear();
    expect(result).toEqual(newPD("2014-12-31"));
  });
});
