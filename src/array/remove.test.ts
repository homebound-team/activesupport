import "./index";

describe("remove", () => {
  it("removes an element from an array", () => {
    // Given an array of strings
    const a = ["a", "b", "c"];
    // When we remove an element
    a.remove("b");
    // Then the array is mutated and the element removed
    expect(a).toEqual(["a", "c"]);
  });

  it("removes multiiple elements from an array", () => {
    // Given an array of strings
    const a = ["a", "b", "c", "d", "e"];
    // When we remove an element
    a.remove("b", "d");
    // Then the array is mutated and the element removed
    expect(a).toEqual(["a", "c", "e"]);
  });
});
