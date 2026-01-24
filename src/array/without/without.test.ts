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

  it("removes 2d arrays without side-effect", () => {
    // Given an array of arrays
    const a = [
      ["a", "a"],
      ["b", "b"],
      ["c", "c"],
    ];
    // When we remove an element
    const b = a.without(a[1]);
    // Then the original array is unchanged
    expect(a).toEqual([
      ["a", "a"],
      ["b", "b"],
      ["c", "c"],
    ]);
    // And the new array is changed
    expect(b).toEqual([
      ["a", "a"],
      ["c", "c"],
    ]);
  });
});
