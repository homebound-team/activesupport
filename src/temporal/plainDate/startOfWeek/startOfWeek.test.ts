import { newPD } from "src/temporal/setupTests";
import { startOfWeek } from "./startOfWeek.impl";

describe("startOfWeek", () => {
  it("returns a date set to the first day of a week", () => {
    const date = newPD("2014-09-02");
    const result = startOfWeek(date);
    expect(result).toEqual(newPD("2014-08-31"));
  });

  it("allows to specify which day is the first day of the week", () => {
    const date = newPD("2014-09-02");
    const result = startOfWeek(date, { weekStartsOn: 1 });
    expect(result).toEqual(newPD("2014-09-01"));
  });

  describe("when the given day is before the start of a week", () => {
    it("it returns the start of a week", () => {
      const date = newPD("2014-10-06");
      const result = startOfWeek(date, { weekStartsOn: 3 });
      expect(result).toEqual(newPD("2014-10-01"));
    });
  });

  describe("when the given day is the start of a week", () => {
    it("it returns the start of a week", () => {
      const date = newPD("2014-10-08");
      const result = startOfWeek(date, { weekStartsOn: 3 });
      expect(result).toEqual(newPD("2014-10-08"));
    });
  });

  describe("when the given day is after the start of a week", () => {
    it("it returns the start of a week", () => {
      const date = newPD("2014-10-10");
      const result = startOfWeek(date, { weekStartsOn: 3 });
      expect(result).toEqual(newPD("2014-10-08"));
    });
  });

  it("handles the week at the start of a year", () => {
    const date = newPD("2014-01-01");
    const result = startOfWeek(date);
    expect(result).toEqual(newPD("2013-12-29"));
  });
});
