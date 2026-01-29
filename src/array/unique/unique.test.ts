import "./unique.global";

describe("unique", () => {
  it("removes duplicates", () => {
    const arr = [1, 2, 2, 3, 3, 3];
    const result = arr.unique();
    expect(result).toEqual([1, 2, 3]);
  });

  it("returns an empty array for an empty array", () => {
    const arr: number[] = [];
    const result = arr.unique();
    expect(result).toEqual([]);
  });

  it("preserves order of first occurrence", () => {
    const arr = [3, 1, 2, 1, 3, 2];
    const result = arr.unique();
    expect(result).toEqual([3, 1, 2]);
  });
});
