import { nonEmpty } from "./nonEmpty.impl";

describe("nonEmpty", () => {
  it("returns true for an array with elements", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call nonEmpty
    const result = nonEmpty(a);
    // then we get back true
    expect(result).toBe(true);
  });

  it("returns false for an empty array", async () => {
    // given an empty array
    const a: string[] = [];
    // when we call nonEmpty
    const result = nonEmpty(a);
    // then we get back false
    expect(result).toBe(false);
  });
});
