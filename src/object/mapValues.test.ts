import "./index";

describe("mapValues", () => {
  it("maps values from an object", () => {
    // Given an object with numbers
    const o = { foo: 1, bar: 2 };
    // When we run mapValues to convert to strings
    const result = o.mapValues((v) => String(v));
    // Then we should get back an object with string values
    expect(result).toEqual({ foo: "1", bar: "2" });
  });

  it("provides the key to the mapping function", () => {
    // Given an object
    const o = { foo: "a", bar: "b" };
    // When we run mapValues with a function that uses the key
    const result = o.mapValues((v, k) => `${k}:${v}`);
    // Then we should get back an object with combined key-value strings
    expect(result).toEqual({ foo: "foo:a", bar: "bar:b" });
  });

  it("handles empty objects", () => {
    // Given an empty object
    const o = {};
    // When we run mapValues
    const result = o.mapValues((v) => v);
    // Then we should get back an empty object
    expect(result).toEqual({});
  });

  it("preserves type information", () => {
    // Given an object with numbers
    const o: Record<string, number> = { foo: 1, bar: 2, baz: 3 };
    // When we run mapValues to double the values
    const result = o.mapValues((v) => v * 2);
    // Then we should get back an object with doubled values
    expect(result).toEqual({ foo: 2, bar: 4, baz: 6 });
  });
});
