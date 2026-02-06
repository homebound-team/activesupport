import { mapToObject } from "./mapToObject.impl";

describe("mapToObject", () => {
  it("returns an object from a callback that returns key/value pairs for each element", () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call mapToObject with a callback that returns key/value pairs
    const result = mapToObject(a, (el, i) => [el, i]);
    // then we get an object with those keys and values
    expect(result).toEqual({ a: 0, b: 1, c: 2 });
  });

  it("type checks with as const", () => {
    // We can call `mapToObject` and use `as const` as a modifier
    mapToObject(["a", "b", "c"], (el, i) => [el, i] as const);
  });

  it("works with an async callback", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call mapToObject with an async callback
    const result = await mapToObject(a, async (el, i) => [el, i] as const);
    // then we get an object with those keys and values
    expect(result).toEqual({ a: 0, b: 1, c: 2 });
  });
});
