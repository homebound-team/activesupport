import { newPD } from "src/temporal/setupTests";
import { endOfMonth } from "./endOfMonth.impl";

describe("endOfMonth", () => {
  it("returns a date set to the last day of a month", () => {
    const date = newPD("2014-09-02");
    const result = endOfMonth(date);
    expect(result).toEqual(newPD("2014-09-30"));
  });

  it("works for last month in year", () => {
    const date = newPD("2014-12-01");
    const result = endOfMonth(date);
    expect(result).toEqual(newPD("2014-12-31"));
  });

  it("works for last day of month", () => {
    const date = newPD("2014-10-31");
    const result = endOfMonth(date);
    expect(result).toEqual(newPD("2014-10-31"));
  });
});
