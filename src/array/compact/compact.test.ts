import { compact } from "./compact.impl";

describe("compact", () => {
  it("returns an array with undefined and null elements removed", async () => {
    // given an array of 6 elements where some are null or undefined and others are falsy
    const a = [0, undefined, 1, false, 2, null];
    // when we compact it
    const result = compact(a);
    // then we get back only the defined, non-null elements
    expect(result).toEqual([0, 1, false, 2]);
  });
});
