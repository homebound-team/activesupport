import { newPD, newZDT } from "src/temporal/setupTests";
import { toPlainDateCT, toPlainDateET, toPlainDateMT, toPlainDatePT, toPlainDateUTC } from "./toPlainDate.impl";

describe("toPlainDate", () => {
  it("generates a plain date from the zoned date using the UTC timezone", () => {
    const zdt = newZDT("2024-05-02T00:00:00.000+09:00[Asia/Tokyo]");
    const result = toPlainDateUTC(zdt);
    expect(result).toEqual(newPD("2024-05-01"));
  });

  it("generates a plain date from the zoned date using the eastern timezone", () => {
    const zdt = newZDT("2024-05-02T00:00:00.000Z");
    const result = toPlainDateET(zdt);
    expect(result).toEqual(newPD("2024-05-01"));
  });

  it("generates a plain date from the zoned date using the central timezone", () => {
    const zdt = newZDT("2024-05-02T00:00:00.000Z");
    const result = toPlainDateCT(zdt);
    expect(result).toEqual(newPD("2024-05-01"));
  });

  it("generates a plain date from the zoned date using the mountain timezone", () => {
    const zdt = newZDT("2024-05-02T00:00:00.000Z");
    const result = toPlainDateMT(zdt);
    expect(result).toEqual(newPD("2024-05-01"));
  });

  it("generates a plain date from the zoned date using the pacific timezone", () => {
    const zdt = newZDT("2024-05-02T00:00:00.000Z");
    const result = toPlainDatePT(zdt);
    expect(result).toEqual(newPD("2024-05-01"));
  });
});
