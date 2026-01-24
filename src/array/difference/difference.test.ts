import "./difference";

describe("difference", () => {
  it("should return elements present in the current array and not the provided array", () => {
    expect([1, 2, 3, 4].difference([3, 4, 5, 6])).toEqual([1, 2]);
    expect(["a", "b", "c"].difference(["b", "c", "d"])).toEqual(["a"]);
  });

  it("should handle empty arrays", () => {
    expect([].difference([])).toEqual([]);
    expect([1, 2, 3].difference([])).toEqual([1, 2, 3]);
    expect([].difference([1, 2, 3] as any)).toEqual([]);
  });

  it("should handle arrays with duplicates", () => {
    expect([1, 1, 2, 2, 3].difference([2, 3, 3, 4])).toEqual([1]);
    expect([1, 2, 2, 3, 3].difference([2, 3])).toEqual([1]);
    expect([1, 1, 1].difference([1, 1])).toEqual([]);
  });
});
