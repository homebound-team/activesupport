import "./index";

describe("indexBy", () => {
  it("can index by multiple keys per element", () => {
    const data = [
      { id: 1, tags: ["red", "small"] },
      { id: 2, tags: ["blue", "large"] },
      { id: 3, tags: ["red", "large"] },
    ];
    const indexed = data.indexBy((item) => item.tags);
    expect(indexed.get("red")).toEqual([
      { id: 1, tags: ["red", "small"] },
      { id: 3, tags: ["red", "large"] },
    ]);
    expect(indexed.get("blue")).toEqual([{ id: 2, tags: ["blue", "large"] }]);
    expect(indexed.get("small")).toEqual([{ id: 1, tags: ["red", "small"] }]);
    expect(indexed.get("large")).toEqual([
      { id: 2, tags: ["blue", "large"] },
      { id: 3, tags: ["red", "large"] },
    ]);
  });

  it("can index with a value function", () => {
    const data = [
      { id: 1, tags: ["red", "small"] },
      { id: 2, tags: ["blue", "large"] },
      { id: 3, tags: ["red", "large"] },
    ];
    const indexed = data.indexBy(
      (item) => item.tags,
      (item) => item.id,
    );
    expect(indexed.get("red")).toEqual([1, 3]);
    expect(indexed.get("blue")).toEqual([2]);
    expect(indexed.get("small")).toEqual([1]);
    expect(indexed.get("large")).toEqual([2, 3]);
  });

  it("handles empty arrays", () => {
    const indexed = [].indexBy(() => []);
    expect(indexed.size).toBe(0);
  });

  it("handles elements with no keys", () => {
    const data = [{ id: 1 }, { id: 2 }];
    const indexed = data.indexBy(() => []);
    expect(indexed.size).toBe(0);
  });

  it("handles duplicate keys for same element", () => {
    const data = [{ id: 1, value: "test" }];
    const indexed = data.indexBy(() => ["key1", "key1", "key2"]);
    expect(indexed.get("key1")).toEqual([{ id: 1, value: "test" }]);
    expect(indexed.get("key2")).toEqual([{ id: 1, value: "test" }]);
  });
});
