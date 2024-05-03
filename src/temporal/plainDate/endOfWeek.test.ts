import { newPD } from "../setupTests";
import "./index";

describe("endOfWeek", () => {
  it("returns a date set to the last day of a week", () => {
    const date = newPD("2014-09-02");
    const result = date.endOfWeek();
    expect(result).toEqual(newPD("2014-09-06"));
  });

  it("allows to specify which day is the first day of the week", () => {
    const date = newPD("2014-09-02");
    const result = date.endOfWeek({ weekStartsOn: 1 });
    expect(result).toEqual(newPD("2014-09-07"));
  });

  describe("when the given day is before the start of a week", () => {
    it("it returns the end of a week", () => {
      const date = newPD("2014-10-06");
      const result = date.endOfWeek({ weekStartsOn: 3 });
      expect(result).toEqual(newPD("2014-10-07"));
    });
  });

  describe("when the given day is the start of a week", () => {
    it("it returns the end of a week", () => {
      const date = newPD("2014-10-08");
      const result = date.endOfWeek({ weekStartsOn: 3 });
      expect(result).toEqual(newPD("2014-10-14"));
    });
  });

  describe("when the given day is after the start of a week", () => {
    it("it returns the end of a week", () => {
      const date = newPD("2014-10-10");
      const result = date.endOfWeek({ weekStartsOn: 3 });
      expect(result).toEqual(newPD("2014-10-14"));
    });
  });

  it("handles the week at the end of a year", () => {
    const date = newPD("2014-12-29");
    const result = date.endOfWeek({ weekStartsOn: 5 });
    expect(result).toEqual(newPD("2015-01-01"));
  });
});
