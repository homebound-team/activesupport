import "./index";

describe("toObject", () => {
  it("returns an object from an array of arrays of key/value pairs", () => {
    // given an array of key/value pairs
    const a = [
      ["a", 5],
      ["b", 6],
      ["c", 7],
    ] as const;
    // when we call toObject
    const result = a.toObject();
    // then we get an object with those keys and values
    expect(result).toEqual({ a: 5, b: 6, c: 7 });
  });
});
