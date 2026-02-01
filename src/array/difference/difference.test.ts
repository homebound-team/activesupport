import { difference } from "./difference.impl";

describe("difference", () => {
  it("should return elements present in the current array and not the provided array", () => {
    expect(difference([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([1, 2]);
    expect(difference(["a", "b", "c"], ["b", "c", "d"])).toEqual(["a"]);
  });

  it("should handle empty arrays", () => {
    expect(difference([], [])).toEqual([]);
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3]);
    expect(difference([], [1, 2, 3] as any)).toEqual([]);
  });

  it("should handle arrays with duplicates", () => {
    expect(difference([1, 1, 2, 2, 3], [2, 3, 3, 4])).toEqual([1]);
    expect(difference([1, 2, 2, 3, 3], [2, 3])).toEqual([1]);
    expect(difference([1, 1, 1], [1, 1])).toEqual([]);
  });
});
