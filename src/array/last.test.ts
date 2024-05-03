import "./index";

describe("last", () => {
  it("returns the the last element of an array", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call last
    const result = a.last;
    // then we get the last element
    expect(result).toBe("c");
  });

  it("returns undefined for an empty array", async () => {
    // given an empty array
    const a = [];
    // when we call first
    const result = a.last;
    // then we get undefined
    expect(result).toBeUndefined();
  });
});
