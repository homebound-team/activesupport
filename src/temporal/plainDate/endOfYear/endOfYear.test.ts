import { newPD } from "src/temporal/setupTests";
import { endOfYear } from "./endOfYear.impl";

describe("endOfYear", () => {
  it("returns a date set to the last day of a year", () => {
    const date = newPD("2014-09-20");
    const result = endOfYear(date);
    expect(result).toEqual(newPD("2014-12-31"));
  });
});
