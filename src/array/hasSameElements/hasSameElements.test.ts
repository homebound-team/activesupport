import "./index";

describe("hasSameElements", () => {
  it("basic identical arrays", () => {
    expect([1, 2, 3].hasSameElements([1, 2, 3])).toBe(true);
    expect(["a", "b", "c"].hasSameElements(["a", "b", "c"])).toBe(true);
  });

  it("different order, same elements", () => {
    expect([1, 2, 3].hasSameElements([3, 1, 2])).toBe(true);
    expect(["a", "b", "c"].hasSameElements(["c", "a", "b"])).toBe(true);
  });

  it("empty arrays", () => {
    expect([].hasSameElements([])).toBe(true);
  });

  it("different lengths", () => {
    expect([1, 2, 3].hasSameElements([1, 2])).toBe(false);
    expect([1, 2].hasSameElements([1, 2, 3])).toBe(false);
    expect([1].hasSameElements([])).toBe(false);
  });

  it("missing elements", () => {
    expect([1, 2, 3].hasSameElements([1, 2, 4])).toBe(false);
    expect(["a", "b", "c"].hasSameElements(["a", "b", "d"])).toBe(false);
  });

  it("extra elements", () => {
    expect([1, 2].hasSameElements([1, 2, 3])).toBe(false);
    expect(["a", "b"].hasSameElements(["a", "b", "c"])).toBe(false);
  });

  it("duplicates with same count", () => {
    expect([1, 1, 2, 3].hasSameElements([1, 2, 1, 3])).toBe(true);
    expect(["a", "a", "b"].hasSameElements(["a", "b", "a"])).toBe(true);
  });

  it("duplicates with different count", () => {
    expect([1, 1, 2].hasSameElements([1, 2, 2])).toBe(false);
    expect([1, 1, 1].hasSameElements([1, 1])).toBe(false);
    expect(["a", "a"].hasSameElements(["a", "a", "a"])).toBe(false);
  });

  it("all same elements", () => {
    expect([1, 1, 1].hasSameElements([1, 1, 1])).toBe(true);
    expect(["x", "x", "x", "x"].hasSameElements(["x", "x", "x", "x"])).toBe(true);
  });

  it("mixed data types", () => {
    expect([1, "2", true].hasSameElements([true, 1, "2"])).toBe(true);
    expect([1, "1"].hasSameElements(["1", 1])).toBe(true);
    expect([0, false].hasSameElements([false, 0])).toBe(true);
  });

  it("objects and arrays use reference equality", () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const arr1 = [1, 2];
    const arr2 = [1, 2];
    expect([obj1, arr1].hasSameElements([obj1, arr1])).toBe(true);
    expect([obj1, arr1].hasSameElements([obj2, arr2])).toBe(false); // Different references
  });

  it("special values", () => {
    expect([null, undefined].hasSameElements([undefined, null])).toBe(true);
    expect([0, -0].hasSameElements([-0, 0])).toBe(true);
    expect([Infinity, -Infinity].hasSameElements([-Infinity, Infinity])).toBe(true);
  });

  it("single element arrays", () => {
    expect([1].hasSameElements([1])).toBe(true);
    expect([1].hasSameElements([2])).toBe(false);
    expect(["a"].hasSameElements(["a"])).toBe(true);
  });

  it("subset/superset cases", () => {
    expect([1, 2].hasSameElements([1, 2, 3])).toBe(false);
    expect([1, 2, 3].hasSameElements([1, 2])).toBe(false);
    expect([1, 2, 3].hasSameElements([1, 2, 3, 4])).toBe(false);
  });

  it("complex duplicate patterns", () => {
    expect([1, 1, 2, 2, 3].hasSameElements([2, 1, 3, 1, 2])).toBe(true);
    expect([1, 1, 2, 2, 3].hasSameElements([1, 2, 2, 3, 3])).toBe(false);
    expect([1, 1, 1, 2, 2].hasSameElements([1, 2, 1, 2, 1])).toBe(true);
  });

  // Large arrays (performance boundary)
  it("arrays at size boundary", () => {
    const arr1 = Array.from({ length: 50 }, (_, i) => i);
    const arr2 = Array.from({ length: 50 }, (_, i) => 49 - i);
    const arr3 = Array.from({ length: 50 }, (_, i) => i % 10);
    expect(arr1.hasSameElements(arr2)).toBe(true);
    expect(arr1.hasSameElements(arr3)).toBe(false);
  });
});
