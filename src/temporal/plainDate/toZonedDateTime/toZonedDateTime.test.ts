import { newPD, newZDT } from "../setupTests";
import "./index";

describe("toZonedDateTime", () => {
  it("generates a plain date from the zoned date using the UTC timezone", () => {
    const date = newPD("2024-05-02");
    const result = date.toUTC();
    expect(result).toEqual(newZDT("2024-05-02T00:00:00.000Z"));
  });

  it("generates a plain date from the zoned date using the eastern timezone", () => {
    const date = newPD("2024-05-02");
    const result = date.toET();
    expect(result).toEqual(newZDT("2024-05-02T04:00:00.000Z"));
  });

  it("generates a plain date from the zoned date using the central timezone", () => {
    const date = newPD("2024-05-02");
    const result = date.toCT();
    expect(result).toEqual(newZDT("2024-05-02T05:00:00.000Z"));
  });

  it("generates a plain date from the zoned date using the mountain timezone", () => {
    const date = newPD("2024-05-02");
    const result = date.toMT();
    expect(result).toEqual(newZDT("2024-05-02T06:00:00.000Z"));
  });

  it("generates a plain date from the zoned date using the pacific timezone", () => {
    const date = newPD("2024-05-02");
    const result = date.toPT();
    expect(result).toEqual(newZDT("2024-05-02T07:00:00.000Z"));
  });
});
