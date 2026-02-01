import { newZDT } from "src/temporal/setupTests";
import { startOfDay } from "./startOfDay.impl";

describe("startOfDay", () => {
  it("returns the date with the time set to 00:00:00", () => {
    const date = newZDT("2014-09-02T11:55:00.000Z");
    const result = startOfDay(date);
    expect(result).toEqual(newZDT("2014-09-02T00:00:00.000Z"));
  });
});
