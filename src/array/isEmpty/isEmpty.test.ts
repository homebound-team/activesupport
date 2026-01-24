import "./index";

describe("isEmpty", () => {
  it("returns false for an array with elements", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call isEmpty
    const result = a.isEmpty;
    // then we get back false
    expect(result).toBe(false);
  });

  it("returns true for an empty array", async () => {
    // given an empty array
    const a = [];
    // when we call isEmpty
    const result = a.isEmpty;
    // then we get back true
    expect(result).toBe(true);
  });
});
