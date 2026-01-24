import "./index";

describe("first", () => {
  it("returns the the first element of an array", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call first
    const result = a.first;
    // then we get the first element
    expect(result).toBe("a");
  });

  it("returns undefined for an empty array", async () => {
    // given an empty array
    const a = [];
    // when we call first
    const result = a.first;
    // then we get undefined
    expect(result).toBeUndefined();
  });
});
