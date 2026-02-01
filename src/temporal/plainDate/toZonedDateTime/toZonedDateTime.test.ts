import { newPD, newZDT } from "src/temporal/setupTests";
import { toCT, toET, toMT, toPT, toUTC } from "./toZonedDateTime.impl";

describe("toZonedDateTime", () => {
  it("generates a plain date from the zoned date using the UTC timezone", () => {
    const date = newPD("2024-05-02");
    const result = toUTC(date);
    expect(result).toEqual(newZDT("2024-05-02T00:00:00.000Z"));
  });

  it("generates a plain date from the zoned date using the eastern timezone", () => {
    const date = newPD("2024-05-02");
    const result = toET(date);
    expect(result).toEqual(newZDT("2024-05-02T04:00:00.000Z"));
  });

  it("generates a plain date from the zoned date using the central timezone", () => {
    const date = newPD("2024-05-02");
    const result = toCT(date);
    expect(result).toEqual(newZDT("2024-05-02T05:00:00.000Z"));
  });

  it("generates a plain date from the zoned date using the mountain timezone", () => {
    const date = newPD("2024-05-02");
    const result = toMT(date);
    expect(result).toEqual(newZDT("2024-05-02T06:00:00.000Z"));
  });

  it("generates a plain date from the zoned date using the pacific timezone", () => {
    const date = newPD("2024-05-02");
    const result = toPT(date);
    expect(result).toEqual(newZDT("2024-05-02T07:00:00.000Z"));
  });
});
