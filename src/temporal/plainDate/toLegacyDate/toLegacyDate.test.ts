import { newPD } from "src/temporal/setupTests";
import { toLegacyDate } from "./toLegacyDate.impl";

describe("toLegacyDate.test", () => {
  it("generates a legacy date from a plain date", () => {
    const date = newPD("2023-05-02");
    const result = toLegacyDate(date, "America/New_York");
    expect(result).toEqual(new Date("2023-05-02T04:00:00.000Z"));
  });
});
