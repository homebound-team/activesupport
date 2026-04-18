import { asyncSome } from "./asyncSome.impl";

describe("asyncSome", () => {
  it("returns true if any element matches callback (even number)", async () => {
    // given an array of even and odd numbers
    const a = [1, 2, 3, 4, 5];
    // when we call asyncSome with a callback that checks for even numbers
    const result = await asyncSome(a, (el) => Promise.resolve(el % 2 === 0));
    // then expect asyncSome to return true
    expect(result).toBe(true);
  });

  it("returns false if no elements match callback (even number)", async () => {
    // given an array of odd numbers
    const a = [1, 3, 5];
    // when we call asyncSome with a callback that checks for even numbers
    const result = await asyncSome(a, (el) => Promise.resolve(el % 2 === 0));
    // then expect asyncSome to return false
    expect(result).toBe(false);
  });

  it("returns false if the array is empty", async () => {
    // given an empty array
    const a: number[] = [];
    // when we call asyncSome with a callback that checks for even numbers
    const result = await asyncSome(a, (el) => Promise.resolve(el % 2 === 0));
    // then expect asyncSome to return false
    expect(result).toBe(false);
  });
});
