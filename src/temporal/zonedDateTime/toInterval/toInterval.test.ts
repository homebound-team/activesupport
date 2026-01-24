import { newZDT } from "../setupTests";
import "./index";

describe("toInterval", () => {
  it("generates an interval from a datetime and another datetime", () => {
    const start = newZDT("2023-05-02T00:00:00.000Z");
    const end = newZDT("2024-05-02T00:00:00.000Z");
    const result = start.toInterval(end);
    expect(result).toMatchObject({ start, end });
  });
});
