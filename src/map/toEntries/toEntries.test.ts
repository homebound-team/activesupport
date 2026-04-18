import { toEntries } from "./toEntries.impl";

describe("toEntries", () => {
  it("returns an array of key/value pairs from a Map", () => {
    // Given a Map
    const m = new Map<string, number | string>([
      ["foo", "a"],
      ["bar", 5],
    ]);
    // When we run toEntries
    const result = toEntries(m);
    // Then we should get back an array of the Map's keys/values
    expect(result).toEqual([
      ["foo", "a"],
      ["bar", 5],
    ]);
  });

  it("returns an empty array for an empty Map", () => {
    const m = new Map();
    expect(toEntries(m)).toEqual([]);
  });

  it("works with Maps with non-string keys", () => {
    const key1 = {};
    const key2 = 42;
    const m = new Map<any, string>([
      [key1, "object"],
      [key2, "number"],
    ]);
    expect(toEntries(m)).toEqual([
      [key1, "object"],
      [key2, "number"],
    ]);
  });
});
