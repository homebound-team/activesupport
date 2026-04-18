import { newPD } from "src/temporal/setupTests";
import { toString } from "./toString.impl";

describe("toString", () => {
  it("returns ISO format when called with no arguments", () => {
    const result = toString(newPD("2024-01-15"));
    expect(result).toBe("2024-01-15");
  });

  it("returns ISO format when called with empty object", () => {
    const result = toString(newPD("2024-01-15"), {});
    expect(result).toBe("2024-01-15");
  });

  it("accepts ShowCalendarOption and returns ISO format with calendar", () => {
    const result = toString(newPD("2024-01-15"), { calendarName: "always" });
    expect(result).toContain("[u-ca=iso8601]");
  });

  it("formats with month and year options", () => {
    const result = toString(newPD("2024-01-15"), { month: "long", year: "numeric" });
    expect(result).toBe("January 2024");
  });

  it("formats with short month", () => {
    const result = toString(newPD("2024-01-15"), { month: "short", day: "numeric" });
    expect(result).toBe("Jan 15");
  });

  it("formats with numeric month", () => {
    const result = toString(newPD("2024-01-15"), { month: "numeric", day: "numeric", year: "numeric" });
    expect(result).toBe("1/15/2024");
  });

  it("formats with weekday", () => {
    const result = toString(newPD("2024-01-15"), { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    expect(result).toBe("Monday, January 15, 2024");
  });

  it("formats with dateStyle", () => {
    const result = toString(newPD("2024-01-15"), { dateStyle: "full" });
    expect(result).toBe("Monday, January 15, 2024");
  });
});
