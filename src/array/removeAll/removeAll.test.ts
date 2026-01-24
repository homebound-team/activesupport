import "./index";

describe("removeAll", () => {
  it("removes array from an array", () => {
    // Given an array of strings
    const a = ["a", "b", "c", "d", "e"];
    // When we remove an element
    a.removeAll(["b", "d"]);
    // Then the array is mutated and the element removed
    expect(a).toEqual(["a", "c", "e"]);
  });
});
