import { count } from "./count.impl";

describe("count", () => {
  it("returns an the number of elements that match the callback", async () => {
    // given an array of 3 odd and 2 even numbers
    const a = [1, 2, 3, 4, 5];
    // when we call count with a callback that matches even numbers
    const result = count(a, (el) => el % 2 === 0);
    // then expect to get back 2
    expect(result).toBe(2);
  });

  it("works asynchronously (ie, given promises)", async () => {
    // given an array of 3 odd and 2 even numbers
    const a = [1, 2, 3, 4, 5];
    // when we call count with a callback that matches even numbers as a promise
    const result = await count(a, (el) => Promise.resolve(el % 2 === 0));
    // then expect to get back 2
    expect(result).toBe(2);
  });
});
