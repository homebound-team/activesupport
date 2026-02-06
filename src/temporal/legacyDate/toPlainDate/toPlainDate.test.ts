import { newPD } from "src/temporal/setupTests";
import { toPlainDate } from "./toPlainDate.impl";

describe("toPlainDate", () => {
  it("converts a legacy Date to a PlainDate in UTC", () => {
    const date = new Date("2024-06-15T12:00:00Z");
    const result = toPlainDate(date, "UTC");
    expect(result).toEqual(newPD("2024-06-15"));
  });

  it("converts a legacy Date to a PlainDate in a different timezone", () => {
    // Midnight UTC on Jan 2 is still Jan 1 in US Pacific
    const date = new Date("2024-01-02T02:00:00Z");
    const result = toPlainDate(date, "America/Los_Angeles");
    expect(result).toEqual(newPD("2024-01-01"));
  });

  it("converts a legacy Date to a PlainDate in a positive-offset timezone", () => {
    // 11pm UTC on Jan 1 is already Jan 2 in Tokyo (+9)
    const date = new Date("2024-01-01T23:00:00Z");
    const result = toPlainDate(date, "Asia/Tokyo");
    expect(result).toEqual(newPD("2024-01-02"));
  });
});
