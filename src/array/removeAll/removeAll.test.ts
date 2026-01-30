import "./removeAll.global";

describe("removeAll", () => {
  it("removes array from an array", () => {
    // Given an array of strings
    const a = ["a", "b", "c", "d", "e", "f", "g"];
    // When we remove elements
    a.removeAll(["a", "c", "e", "f"]);
    // Then the array is mutated and the elements are removed
    expect(a).toEqual(["b", "d", "g"]);
  });
});
