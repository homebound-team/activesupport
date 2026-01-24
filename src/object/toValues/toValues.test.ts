import "./index";

describe("toValues", () => {
  it("returns an array of values pairs from an object", () => {
    // Given an object
    const o = { foo: "a", bar: 5 };
    // When we run toValues
    const result = o.toValues();
    // Then we should get back an array of the object's values
    expect(result).toEqual(["a", 5]);
  });
});
