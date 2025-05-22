import "./xor";

describe("xor", () => {
  it("should return elements that are in either array but not both", () => {
    expect([1, 2, 3, 4].xor([3, 4, 5, 6])).toEqual([1, 2, 5, 6]);
    expect([1, 2].xor([3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("should handle empty arrays", () => {
    expect([].xor([1, 2] as any)).toEqual([1, 2]);
    expect([1, 2].xor([])).toEqual([1, 2]);
    expect([].xor([])).toEqual([]);
  });

  it("should handle arrays with duplicates", () => {
    expect([1, 1, 2, 2].xor([2, 2, 3, 3])).toEqual([1, 3]);
  });
});
