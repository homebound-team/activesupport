import { last } from "./last.impl";

describe("last", () => {
  it("returns the the last element of an array", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call last
    const result = last(a);
    // then we get the last element
    expect(result).toBe("c");
  });

  it("returns undefined for an empty array", async () => {
    // given an empty array
    const a: string[] = [];
    // when we call first
    const result = last(a);
    // then we get undefined
    expect(result).toBeUndefined();
  });
});
