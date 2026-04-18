import { newZDT } from "src/temporal/setupTests";
import { toZonedDateTime } from "./toZonedDateTime.impl";

describe("toZonedDateTime", () => {
  it("converts a legacy Date to a ZonedDateTime in UTC", () => {
    const date = new Date("2024-06-15T12:30:00Z");
    const result = toZonedDateTime(date, "UTC");
    expect(result).toEqual(newZDT("2024-06-15T12:30:00.000Z"));
  });

  it("converts a legacy Date to a ZonedDateTime in a named timezone", () => {
    const date = new Date("2024-06-15T12:00:00Z");
    const result = toZonedDateTime(date, "America/New_York");
    expect(result.timeZoneId).toBe("America/New_York");
    expect(result.hour).toBe(8);
  });

  it("preserves the exact instant across timezones", () => {
    const date = new Date("2024-01-01T00:00:00Z");
    const utc = toZonedDateTime(date, "UTC");
    const tokyo = toZonedDateTime(date, "Asia/Tokyo");
    expect(utc).toEqual(tokyo);
  });
});
