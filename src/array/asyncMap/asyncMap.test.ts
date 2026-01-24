import "./index";

describe("asyncMap", () => {
  it("returns an array of the result of the callback called on each element", async () => {
    // given an array of 4 numbers
    const a = [1, 2, 3, 4];
    // when we call asyncMap with a callback that multiplies the number by 2
    const result = await a.asyncMap((el) => Promise.resolve(el * 2));
    // then expect to get back an array of each number multiplied by 2
    expect(result).toEqual([2, 4, 6, 8]);
  });
});
