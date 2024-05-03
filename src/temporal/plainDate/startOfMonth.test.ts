import { newPD } from "../setupTests";
import "./index";

describe("startOfMonth", () => {
  it("returns a date set to the first day of a month", () => {
    const date = newPD("2014-09-02");
    const result = date.startOfMonth();
    expect(result).toEqual(newPD("2014-09-01"));
  });
});
