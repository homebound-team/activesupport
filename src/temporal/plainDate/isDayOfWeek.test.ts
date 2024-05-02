import { newPD } from "../setupTests";

describe("isMonday", () => {
  it("returns true if the given date is Monday", () => {
    const date = newPD("2014-09-22");
    expect(date.isMonday).toBe(true);
  });

  it("returns false if the given date is not Monday", () => {
    const date = newPD("2014-09-21");
    expect(date.isMonday).toBe(false);
  });
});

describe("isTuesday", () => {
  it("returns true if the given date is Tuesday", () => {
    const date = newPD("2014-09-23");
    expect(date.isTuesday).toBe(true);
  });

  it("returns false if the given date is not Tuesday", () => {
    const date = newPD("2014-09-22");
    expect(date.isTuesday).toBe(false);
  });
});

describe("isWednesday", () => {
  it("returns true if the given date is Wednesday", () => {
    const date = newPD("2014-09-24");
    expect(date.isWednesday).toBe(true);
  });

  it("returns false if the given date is not Wednesday", () => {
    const date = newPD("2014-09-23");
    expect(date.isWednesday).toBe(false);
  });
});

describe("isThursday", () => {
  it("returns true if the given date is Thursday", () => {
    const date = newPD("2014-09-25");
    expect(date.isThursday).toBe(true);
  });

  it("returns false if the given date is not Thursday", () => {
    const date = newPD("2014-09-24");
    expect(date.isThursday).toBe(false);
  });
});

describe("isFriday", () => {
  it("returns true if the given date is Friday", () => {
    const date = newPD("2014-09-26");
    expect(date.isFriday).toBe(true);
  });

  it("returns false if the given date is not Friday", () => {
    const date = newPD("2014-09-25");
    expect(date.isFriday).toBe(false);
  });
});

describe("isSaturday", () => {
  it("returns true if the given date is Saturday", () => {
    const date = newPD("2014-09-27");
    expect(date.isSaturday).toBe(true);
  });

  it("returns false if the given date is not Saturday", () => {
    const date = newPD("2014-09-26");
    expect(date.isSaturday).toBe(false);
  });
});

describe("isSunday", () => {
  it("returns true if the given date is Sunday", () => {
    const date = newPD("2014-09-28");
    expect(date.isSunday).toBe(true);
  });

  it("returns false if the given date is not Sunday", () => {
    const date = newPD("2014-09-27");
    expect(date.isSunday).toBe(false);
  });
});
