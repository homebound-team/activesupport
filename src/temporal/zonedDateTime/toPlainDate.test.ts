import { newPD, newZDT } from "../setupTests";
import "./index";

describe("toPlainDate", () => {
  it("generates a plain date from the zoned date using the UTC timezone", () => {
    const zdt = newZDT("2024-05-02T00:00:00.000+0900", "Asia/Kolkata");
    const result = zdt.toPlainDateUTC();
    expect(result).toEqual(newPD("2024-05-01"));
  });

  it("generates a plain date from the zoned date using the eastern timezone", () => {
    const zdt = newZDT("2024-05-02T00:00:00.000Z");
    const result = zdt.toPlainDateET();
    expect(result).toEqual(newPD("2024-05-01"));
  });

  it("generates a plain date from the zoned date using the central timezone", () => {
    const zdt = newZDT("2024-05-02T00:00:00.000Z");
    const result = zdt.toPlainDateCT();
    expect(result).toEqual(newPD("2024-05-01"));
  });

  it("generates a plain date from the zoned date using the mountain timezone", () => {
    const zdt = newZDT("2024-05-02T00:00:00.000Z");
    const result = zdt.toPlainDateMT();
    expect(result).toEqual(newPD("2024-05-01"));
  });

  it("generates a plain date from the zoned date using the pacific timezone", () => {
    const zdt = newZDT("2024-05-02T00:00:00.000Z");
    const result = zdt.toPlainDatePT();
    expect(result).toEqual(newPD("2024-05-01"));
  });
});
