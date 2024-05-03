import { newPD, newPDInterval } from "../setupTests";
import "./index";

describe("isWithinInterval", () => {
  it("returns true if the given date in within the given interval", () => {
    const result = newPD("2014-10-31").isWithin(newPDInterval("2014-09-01", "2014-12-31"));
    expect(result).toBe(true);
  });

  it("returns true if the given date is the same as the left boundary of the interval", () => {
    const result = newPD("2014-09-01").isWithin(newPDInterval("2014-09-01", "2014-12-31"));
    expect(result).toBe(true);
  });

  it("returns true if the given date is the same as the right boundary of the interval", () => {
    const result = newPD("2014-12-31").isWithin(newPDInterval("2014-09-01", "2014-12-31"));
    expect(result).toBe(true);
  });

  it("returns true if the given date and the both boundaries are the same", () => {
    const result = newPD("2014-12-31").isWithin(newPDInterval("2014-12-31", "2014-12-31"));
    expect(result).toBe(true);
  });

  it("returns false if the given date is outside of the interval", () => {
    const result = newPD("2014-02-11").isWithin(newPDInterval("2014-09-01", "2014-12-31"));
    expect(result).toBe(false);
  });

  it("normalizes the interval if the start date is after the end date", () => {
    const result = newPD("2014-10-31").isWithin(newPDInterval("2014-12-31", "2014-09-01"));
    expect(result).toBe(true);
  });

  it("properly sorts the dates", () => {
    const result = newPD("2023-12-19").isWithin(newPDInterval("2001-09-01", "2023-12-20"));
    expect(result).toBe(true);
  });
});
