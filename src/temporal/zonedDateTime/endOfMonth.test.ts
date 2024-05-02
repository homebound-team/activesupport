import { newZDT } from "../setupTests";
describe("endOfMonth", () => {
  it("returns the date with the time set to 23:59:59.999 and the date set to the last day of a month", () => {
    const date = newZDT("2014-09-02T11:55:00.000Z");
    const result = date.endOfMonth();
    expect(result).toEqual(newZDT("2014-09-30T23:59:59.999Z"));
  });

  it("works for last month in year", () => {
    const date = newZDT("2014-12-01T00:00:00.000Z");
    const result = date.endOfMonth();
    expect(result).toEqual(newZDT("2014-12-31T23:59:59.999Z"));
  });

  it("works for last day of month", () => {
    const date = newZDT("2014-10-31T00:00:00.000Z");
    const result = date.endOfMonth();
    expect(result).toEqual(newZDT("2014-10-31T23:59:59.999Z"));
  });
});
