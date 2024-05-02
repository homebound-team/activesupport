import "./index";

describe("mapToObject", () => {
  it("returns an object from a callback that returns key/value pairs for each element", () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call mapToObject with a callback that returns key/value pairs
    const result = a.mapToObject((el, i) => [el, i]);
    // then we get an object with those keys and values
    expect(result).toEqual({ a: 0, b: 1, c: 2 });
  });
});
