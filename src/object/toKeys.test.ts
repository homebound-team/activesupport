import "./index";

describe("toKeys", () => {
  it("returns an array of values pairs from an object", () => {
    // Given an object
    const o = { foo: "a", bar: 5 };
    // When we run toKeys
    const result = o.toKeys();
    // Then we should get back an array of the object's keys
    expect(result).toEqual(["foo", "bar"]);
  });
});
