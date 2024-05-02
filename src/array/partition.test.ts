import "./index";

describe("partition", () => {
  it("works on empty arrays", () => {
    expect([].partition((f: number) => f === 0)).toEqual([[], []]);
  });

  it("separates an array into two arrays using the predicate", () => {
    expect([1, 2, 3, 4, 5, 6].partition((f: number) => f % 2 === 0)).toEqual([
      [2, 4, 6],
      [1, 3, 5],
    ]);
  });
});
