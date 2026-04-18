import { newZDT, newZDTInterval } from "src/temporal/setupTests";
import { isWithin } from "./isWithin.impl";

describe("isWithin", () => {
  it("returns true if the given date in within the given interval", () => {
    const result = isWithin(
      newZDT("2014-10-31T00:00:00.000Z"),
      newZDTInterval("2014-09-01T00:00:00.000Z", "2014-12-31T00:00:00.000Z"),
    );
    expect(result).toBe(true);
  });

  it("returns true if the given date has same time as the left boundary of the interval", () => {
    const result = isWithin(
      newZDT("2014-09-01T00:00:00.000Z"),
      newZDTInterval("2014-09-01T00:00:00.000Z", "2014-12-31T00:00:00.000Z"),
    );
    expect(result).toBe(true);
  });

  it("returns true if the given date has same time as the right boundary of the interval", () => {
    const result = isWithin(
      newZDT("2014-12-31T00:00:00.000Z"),
      newZDTInterval("2014-09-01T00:00:00.000Z", "2014-12-31T00:00:00.000Z"),
    );
    expect(result).toBe(true);
  });

  it("returns true if the given date and the both boundaries are the same", () => {
    const result = isWithin(
      newZDT("2014-12-31T00:00:00.000Z"),
      newZDTInterval("2014-12-31T00:00:00.000Z", "2014-12-31T00:00:00.000Z"),
    );
    expect(result).toBe(true);
  });

  it("returns false if the given date is outside of the interval", () => {
    const result = isWithin(
      newZDT("2014-02-11T00:00:00.000Z"),
      newZDTInterval("2014-09-01T00:00:00.000Z", "2014-12-31T00:00:00.000Z"),
    );
    expect(result).toBe(false);
  });

  it("normalizes the interval if the start date is after the end date", () => {
    const result = isWithin(
      newZDT("2014-10-31T00:00:00.000Z"),
      newZDTInterval("2014-12-31T00:00:00.000Z", "2014-09-01T00:00:00.000Z"),
    );
    expect(result).toBe(true);
  });

  it("properly sorts the dates", () => {
    const result = isWithin(
      newZDT("2023-12-19T00:00:00.000Z"),
      newZDTInterval("2001-09-01T00:00:00.000Z", "2023-12-20T00:00:00.000Z"),
    );
    expect(result).toBe(true);
  });
});
