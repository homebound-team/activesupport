import { newPD } from "src/temporal/setupTests";
import { startOfMonth } from "./startOfMonth.impl";

describe("startOfMonth", () => {
  it("returns a date set to the first day of a month", () => {
    const date = newPD("2014-09-02");
    const result = startOfMonth(date);
    expect(result).toEqual(newPD("2014-09-01"));
  });
});
