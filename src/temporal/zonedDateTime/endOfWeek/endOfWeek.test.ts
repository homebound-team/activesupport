import { newZDT } from "../setupTests";

describe("endOfWeek", () => {
  it("returns the date with the time set to 23:59:59:999 and the date set to the last day of a week", () => {
    const date = newZDT("2014-09-02T11:55:00.000Z");
    const result = date.endOfWeek();
    expect(result).toEqual(newZDT("2014-09-06T23:59:59.999Z"));
  });

  it("allows to specify which day is the first day of the week", () => {
    const date = newZDT("2014-09-02T11:55:00.000Z");
    const result = date.endOfWeek({ weekStartsOn: 1 });
    expect(result).toEqual(newZDT("2014-09-07T23:59:59.999Z"));
  });

  describe("when the given day is before the start of a week", () => {
    it("it returns the end of a week", () => {
      const date = newZDT("2014-10-06T00:00:00.000Z");
      const result = date.endOfWeek({ weekStartsOn: 3 });
      expect(result).toEqual(newZDT("2014-10-07T23:59:59.999Z"));
    });
  });

  describe("when the given day is the start of a week", () => {
    it("it returns the end of a week", () => {
      const date = newZDT("2014-10-08T00:00:00.000Z");
      const result = date.endOfWeek({ weekStartsOn: 3 });
      expect(result).toEqual(newZDT("2014-10-14T23:59:59.999Z"));
    });
  });

  describe("when the given day is after the start of a week", () => {
    it("it returns the end of a week", () => {
      const date = newZDT("2014-10-10T00:00:00.000Z");
      const result = date.endOfWeek({ weekStartsOn: 3 });
      expect(result).toEqual(newZDT("2014-10-14T23:59:59.999Z"));
    });
  });

  it("handles the week at the end of a year", () => {
    const date = newZDT("2014-12-29T00:00:00.000Z");
    const result = date.endOfWeek({ weekStartsOn: 5 });
    expect(result).toEqual(newZDT("2015-01-01T23:59:59.999Z"));
  });
});
