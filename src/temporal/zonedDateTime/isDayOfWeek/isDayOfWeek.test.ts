import { newZDT } from "src/temporal/setupTests";
import { isFriday, isMonday, isSaturday, isSunday, isThursday, isTuesday, isWednesday } from "./isDayOfWeek.impl";

describe("isMonday", () => {
  it("returns true if the given date is Monday", () => {
    const result = isMonday(newZDT("2014-09-22T00:00:00.000Z"));
    expect(result).toBe(true);
  });

  it("returns false if the given date is not Monday", () => {
    const result = isMonday(newZDT("2014-09-25T00:00:00.000Z"));
    expect(result).toBe(false);
  });
});

describe("isTuesday", () => {
  it("returns true if the given date is Tuesday", () => {
    const result = isTuesday(newZDT("2014-09-23T00:00:00.000Z"));
    expect(result).toBe(true);
  });

  it("returns false if the given date is not Tuesday", () => {
    const result = isTuesday(newZDT("2014-09-22T00:00:00.000Z"));
    expect(result).toBe(false);
  });
});

describe("isWednesday", () => {
  it("returns true if the given date is Wednesday", () => {
    const result = isWednesday(newZDT("2014-09-24T00:00:00.000Z"));
    expect(result).toBe(true);
  });

  it("returns false if the given date is not Wednesday", () => {
    const result = isWednesday(newZDT("2014-09-23T00:00:00.000Z"));
    expect(result).toBe(false);
  });
});

describe("isThursday", () => {
  it("returns true if the given date is Thursday", () => {
    const result = isThursday(newZDT("2014-09-25T00:00:00.000Z"));
    expect(result).toBe(true);
  });

  it("returns false if the given date is not Thursday", () => {
    const result = isThursday(newZDT("2014-09-24T00:00:00.000Z"));
    expect(result).toBe(false);
  });
});

describe("isFriday", () => {
  it("returns true if the given date is Friday", () => {
    const result = isFriday(newZDT("2014-09-26T00:00:00.000Z"));
    expect(result).toBe(true);
  });

  it("returns false if the given date is not Friday", () => {
    const result = isFriday(newZDT("2014-09-25T00:00:00.000Z"));
    expect(result).toBe(false);
  });
});

describe("isSaturday", () => {
  it("returns true if the given date is Saturday", () => {
    const result = isSaturday(newZDT("2014-09-27T00:00:00.000Z"));
    expect(result).toBe(true);
  });

  it("returns false if the given date is not Saturday", () => {
    const result = isSaturday(newZDT("2014-09-26T00:00:00.000Z"));
    expect(result).toBe(false);
  });
});

describe("isSunday", () => {
  it("returns true if the given date is Sunday", () => {
    const result = isSunday(newZDT("2014-09-28T00:00:00.000Z"));
    expect(result).toBe(true);
  });

  it("returns false if the given date is not Sunday", () => {
    const result = isSunday(newZDT("2014-09-27T00:00:00.000Z"));
    expect(result).toBe(false);
  });
});
