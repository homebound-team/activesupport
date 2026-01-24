import "./index";

describe("asyncFlatMap", () => {
  it("returns a flattened array of the result of the callback", async () => {
    // given an array of 4 numbers
    const a = [1, 2, 3, 4];
    // when we call asyncFlatMap with a callback that returns an array of 2 numbers
    const result = await a.asyncFlatMap((el) => Promise.resolve([el, el * 2]));
    // then expect to get back an array with all 8 numbers
    expect(result).toEqual([1, 2, 2, 4, 3, 6, 4, 8]);
  });

  it("only flattens to a depth of 1", async () => {
    // given an array of numbers
    const a = [1, 2, 3];
    // when we call asyncFlatMap with a callback that returns an array of a number plus 2 more numbers in a nested array
    const result = await a.asyncFlatMap((el) => Promise.resolve([el, [el * 2, el * 3]]));
    // then expect to get back an array of numbers and nested arrays of numbers
    expect(result).toEqual([1, [2, 3], 2, [4, 6], 3, [6, 9]]);
  });
});
