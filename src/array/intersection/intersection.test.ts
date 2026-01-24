import "./intersection";

describe("Array.intersection", () => {
  it("should return elements present in both arrays", () => {
    expect([1, 2, 3, 4].intersection([3, 4, 5, 6])).toEqual([3, 4]);
    expect(["a", "b", "c"].intersection(["b", "c", "d"])).toEqual(["b", "c"]);
  });

  it("should handle arrays with duplicates", () => {
    expect([1, 1, 2, 2].intersection([1, 2, 2, 3])).toEqual([1, 2]);
    expect([1, 2, 2, 3].intersection([2, 2, 3, 3])).toEqual([2, 3]);
  });
});
