import "./index";

describe("toEntries", () => {
  it("returns an array of key/value pairs from an object", () => {
    // Given an object
    const o = { foo: "a", bar: 5 };
    // When we run toEntries
    const result = o.toEntries();
    // Then we should get back an array of the object's keys/values
    expect(result).toEqual([
      ["foo", "a"],
      ["bar", 5],
    ]);
  });
});
