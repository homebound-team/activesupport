import { newZDT } from "src/temporal/setupTests";
import { endOfDay } from "./endOfDay.impl";

describe("endOfDay", () => {
  it("returns the date with the time set to 23:59:59.999", () => {
    const date = newZDT("2014-09-02T11:55:00.000Z");
    const result = endOfDay(date);
    expect(result).toEqual(newZDT("2014-09-02T23:59:59.999Z"));
  });
});
