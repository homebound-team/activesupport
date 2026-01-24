import "./index";

describe("asyncFilter", () => {
  it("returns elements that match the predicate (even number)", async () => {
    // given an array of even and odd numbers
    const a = [1, 2, 3, 4, 5];
    // when we call asyncFilter with a predicate that checks for even numbers
    const result = await a.asyncFilter((el) => Promise.resolve(el % 2 === 0));
    // then expect asyncFilter to return only 2,4
    expect(result).toEqual([2, 4]);
  });

  it("returns an empty array if no elements match predicate (even number)", async () => {
    // given an array of odd numbers
    const a = [1, 3, 5];
    // when we call asyncSome with a predicate that checks for even numbers
    const result = await a.asyncFilter((el) => Promise.resolve(el % 2 === 0));
    // then expect asyncSome to return false
    expect(result).toEqual([]);
  });
});
