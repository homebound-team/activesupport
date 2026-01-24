import "./index";

describe("batched", () => {
  it("returns an array of arrays where each sub array's length matches the batch size", async () => {
    // given an array of 6 elements
    const a = [1, 2, 3, 4, 5, 6];
    // when we call batched with a size of 3
    const result = a.batched(3);
    // then expect to get back an array with 2 sub arrays, each 3 elements long with the elements distributed in order
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it("includes any remaining elements in a final sub-array", async () => {
    // given an array of 5 elements
    const a = [1, 2, 3, 4, 5];
    // when we call batched with a size of 2
    const result = a.batched(2);
    // then expect to get back an array with 3 sub arrays, the first two with two elements and the last with only one
    // distributed in order
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });
});
