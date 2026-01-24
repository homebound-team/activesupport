import "./index";

describe("findAfter", () => {
  it("returns the element that follows the matched element in the array", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call findAfter with an element
    const result = a.findAfter("a");
    // then we get the element after the one we passed
    expect(result).toBe("b");
  });

  it("returns undefined for the last element in an array", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call findAfter with an element
    const result = a.findAfter("c");
    // then we get undefined
    expect(result).toBeUndefined();
  });

  it("returns undefined for an element not in an array", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call findAfter with an element
    const result = a.findAfter("d");
    // then we get undefined
    expect(result).toBeUndefined();
  });
});
