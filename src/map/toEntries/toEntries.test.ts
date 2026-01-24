import "./toEntries";

describe("Map.toEntries", () => {
  it("returns an array of key/value pairs from a Map", () => {
    // Given a Map
    const m = new Map<string, number | string>([
      ["foo", "a"],
      ["bar", 5],
    ]);
    // When we run toEntries
    const result = m.toEntries();
    // Then we should get back an array of the Map's keys/values
    expect(result).toEqual([
      ["foo", "a"],
      ["bar", 5],
    ]);
  });

  it("returns an empty array for an empty Map", () => {
    const m = new Map();
    expect(m.toEntries()).toEqual([]);
  });

  it("works with Maps with non-string keys", () => {
    const key1 = {};
    const key2 = 42;
    const m = new Map<any, string>([
      [key1, "object"],
      [key2, "number"],
    ]);
    expect(m.toEntries()).toEqual([
      [key1, "object"],
      [key2, "number"],
    ]);
  });
});
