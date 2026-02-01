import { intersection } from "./intersection.impl";

describe("Array.intersection", () => {
  it("should return elements present in both arrays", () => {
    expect(intersection([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([3, 4]);
    expect(intersection(["a", "b", "c"], ["b", "c", "d"])).toEqual(["b", "c"]);
  });

  it("should handle arrays with duplicates", () => {
    expect(intersection([1, 1, 2, 2], [1, 2, 2, 3])).toEqual([1, 2]);
    expect(intersection([1, 2, 2, 3], [2, 2, 3, 3])).toEqual([2, 3]);
  });
});
