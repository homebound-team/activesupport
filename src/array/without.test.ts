import "./index";

describe("without", () => {
  it("removes without side-effect", () => {
    // Given an array of strings
    const a = ["a", "b", "c"];
    // When we remove an element
    const b = a.without("b");
    // Then the original array is unchanged
    expect(a).toEqual(["a", "b", "c"]);
    // And the new array is changed
    expect(b).toEqual(["a", "c"]);
  });

  it("removes multiple elements without side-effect", () => {
    // Given an array of strings
    const a = ["a", "b", "c", "d", "e"];
    // When we remove an element
    const b = a.without("b", "d");
    // Then the original array is unchanged
    expect(a).toEqual(["a", "b", "c", "d", "e"]);
    // And the new array is changed
    expect(b).toEqual(["a", "c", "e"]);
  });
});
