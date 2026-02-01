import { newPD } from "src/temporal/setupTests";
import { isFriday, isMonday, isSaturday, isSunday, isThursday, isTuesday, isWednesday } from "./isDayOfWeek.impl";

describe("isMonday", () => {
  it("returns true if the given date is Monday", () => {
    const date = newPD("2014-09-22");
    expect(isMonday(date)).toBe(true);
  });

  it("returns false if the given date is not Monday", () => {
    const date = newPD("2014-09-21");
    expect(isMonday(date)).toBe(false);
  });
});

describe("isTuesday", () => {
  it("returns true if the given date is Tuesday", () => {
    const date = newPD("2014-09-23");
    expect(isTuesday(date)).toBe(true);
  });

  it("returns false if the given date is not Tuesday", () => {
    const date = newPD("2014-09-22");
    expect(isTuesday(date)).toBe(false);
  });
});

describe("isWednesday", () => {
  it("returns true if the given date is Wednesday", () => {
    const date = newPD("2014-09-24");
    expect(isWednesday(date)).toBe(true);
  });

  it("returns false if the given date is not Wednesday", () => {
    const date = newPD("2014-09-23");
    expect(isWednesday(date)).toBe(false);
  });
});

describe("isThursday", () => {
  it("returns true if the given date is Thursday", () => {
    const date = newPD("2014-09-25");
    expect(isThursday(date)).toBe(true);
  });

  it("returns false if the given date is not Thursday", () => {
    const date = newPD("2014-09-24");
    expect(isThursday(date)).toBe(false);
  });
});

describe("isFriday", () => {
  it("returns true if the given date is Friday", () => {
    const date = newPD("2014-09-26");
    expect(isFriday(date)).toBe(true);
  });

  it("returns false if the given date is not Friday", () => {
    const date = newPD("2014-09-25");
    expect(isFriday(date)).toBe(false);
  });
});

describe("isSaturday", () => {
  it("returns true if the given date is Saturday", () => {
    const date = newPD("2014-09-27");
    expect(isSaturday(date)).toBe(true);
  });

  it("returns false if the given date is not Saturday", () => {
    const date = newPD("2014-09-26");
    expect(isSaturday(date)).toBe(false);
  });
});

describe("isSunday", () => {
  it("returns true if the given date is Sunday", () => {
    const date = newPD("2014-09-28");
    expect(isSunday(date)).toBe(true);
  });

  it("returns false if the given date is not Sunday", () => {
    const date = newPD("2014-09-27");
    expect(isSunday(date)).toBe(false);
  });
});
