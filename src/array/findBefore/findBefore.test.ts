import "./index";

describe("findBefore", () => {
  it("returns the element that precedes the matched element in the array", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call findBefore with an element
    const result = a.findBefore("c");
    // then we get the element before the one we passed
    expect(result).toBe("b");
  });

  it("returns undefined for the first element in an array", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call findBefore with an element
    const result = a.findBefore("a");
    // then we get undefined
    expect(result).toBeUndefined();
  });

  it("returns undefined for an element not in an array", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call findBefore with an element
    const result = a.findBefore("d");
    // then we get undefined
    expect(result).toBeUndefined();
  });
});
