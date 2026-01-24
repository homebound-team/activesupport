import { newZDT } from "../setupTests";

describe("startOfWeek", () => {
  it("returns the date with the time set to 00:00:00 and the date set to the first day of a week", () => {
    const date = newZDT("2014-09-02T11:55:00.000Z");
    const result = date.startOfWeek();
    expect(result).toEqual(newZDT("2014-08-31T00:00:00.000Z"));
  });

  it("allows to specify which day is the first day of the week", () => {
    const date = newZDT("2014-09-02T11:55:00.000Z");
    const result = date.startOfWeek({ weekStartsOn: 1 });
    expect(result).toEqual(newZDT("2014-09-01T00:00:00.000Z"));
  });

  describe("when the given day is before the start of a week", () => {
    it("it returns the start of a week", () => {
      const date = newZDT("2014-10-06T00:00:00.000Z");
      const result = date.startOfWeek({ weekStartsOn: 3 });
      expect(result).toEqual(newZDT("2014-10-01T00:00:00.000Z"));
    });
  });

  describe("when the given day is the start of a week", () => {
    it("it returns the start of a week", () => {
      const date = newZDT("2014-10-08T00:00:00.000Z");
      const result = date.startOfWeek({ weekStartsOn: 3 });
      expect(result).toEqual(newZDT("2014-10-08T00:00:00.000Z"));
    });
  });

  describe("when the given day is after the start of a week", () => {
    it("it returns the start of a week", () => {
      const date = newZDT("2014-10-10T00:00:00.000Z");
      const result = date.startOfWeek({ weekStartsOn: 3 });
      expect(result).toEqual(newZDT("2014-10-08T00:00:00.000Z"));
    });
  });

  it("handles the week at the start of a year", () => {
    const date = newZDT("2014-01-01T00:00:00.000Z");
    const result = date.startOfWeek();
    expect(result).toEqual(newZDT("2013-12-29T00:00:00.000Z"));
  });
});
