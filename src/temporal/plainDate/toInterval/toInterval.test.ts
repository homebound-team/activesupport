import { newPD } from "../setupTests";
import "./index";

describe("toInterval", () => {
  it("generates an interval from a plain date and another plain date", () => {
    const start = newPD("2023-05-02");
    const end = newPD("2024-05-02");
    const result = start.toInterval(end);
    expect(result).toMatchObject({ start, end });
  });
});
