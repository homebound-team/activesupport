import "./index";

describe("compact", () => {
  it("returns an array with undefined and null elements removed", async () => {
    // given an array of 6 elements where some are null or undefined and others are falsy
    const a = [0, undefined, 1, false, 2, null];
    // when we call batched with a size of 2
    const result = a.compact();
    // then expect to get back an array with 2 sub arrays, each 3 elements long with the elements distributed in order
    expect(result).toEqual([0, 1, false, 2]);
  });
});
