import "./index";

describe("withoutAll", () => {
  it("removes array without side-effect", () => {
    // Given an array of strings
    const a = ["a", "b", "c"];
    // When we remove an element
    const b = a.withoutAll(["b"]);
    // Then the original array is unchanged
    expect(a).toEqual(["a", "b", "c"]);
    // And the new array is changed
    expect(b).toEqual(["a", "c"]);
  });
});
