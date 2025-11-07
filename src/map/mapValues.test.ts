import "./index";

describe("mapValues", () => {
  it("maps values from a map", () => {
    // Given a map with numbers
    const m = new Map([
      ["foo", 1],
      ["bar", 2],
    ]);
    // When we run mapValues to convert to strings
    const result = m.mapValues((v) => String(v));
    // Then we should get back a map with string values
    expect(result).toEqual(
      new Map([
        ["foo", "1"],
        ["bar", "2"],
      ]),
    );
  });

  it("provides the key to the mapping function", () => {
    // Given a map
    const m = new Map([
      ["foo", "a"],
      ["bar", "b"],
    ]);
    // When we run mapValues with a function that uses the key
    const result = m.mapValues((v, k) => `${k}:${v}`);
    // Then we should get back a map with combined key-value strings
    expect(result).toEqual(
      new Map([
        ["foo", "foo:a"],
        ["bar", "bar:b"],
      ]),
    );
  });

  it("handles empty maps", () => {
    // Given an empty map
    const m = new Map();
    // When we run mapValues
    const result = m.mapValues((v) => v);
    // Then we should get back an empty map
    expect(result).toEqual(new Map());
  });

  it("preserves type information", () => {
    // Given a map with numbers
    const m: Map<string, number> = new Map([
      ["foo", 1],
      ["bar", 2],
      ["baz", 3],
    ]);
    // When we run mapValues to double the values
    const result = m.mapValues((v) => v * 2);
    // Then we should get back a map with doubled values
    expect(result).toEqual(
      new Map([
        ["foo", 2],
        ["bar", 4],
        ["baz", 6],
      ]),
    );
  });

  it("returns a new map instance", () => {
    // Given a map
    const m = new Map([["foo", 1]]);
    // When we run mapValues
    const result = m.mapValues((v) => v * 2);
    // Then we should get a different map instance
    expect(result).not.toBe(m);
    // And the original map should be unchanged
    expect(m.get("foo")).toBe(1);
    expect(result.get("foo")).toBe(2);
  });
});
