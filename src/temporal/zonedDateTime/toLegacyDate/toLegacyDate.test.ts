import { newZDT } from "src/temporal/setupTests";
import { toLegacyDate } from "./toLegacyDate.impl";

describe("toLegacyDate", () => {
  it("generates a legacy date from a datetime", () => {
    const zdt = newZDT("2023-05-02T12:11:36.438Z");
    const result = toLegacyDate(zdt);
    expect(result).toEqual(new Date("2023-05-02T12:11:36.438Z"));
  });
});
