import "./index";

describe("notSameElements", () => {
  it("basic identical arrays", () => {
    expect([1, 2, 3].notSameElements([1, 2, 3])).toBe(false);
    expect(["a", "b", "c"].notSameElements(["a", "b", "c"])).toBe(false);
  });

  it("different order, same elements", () => {
    expect([1, 2, 3].notSameElements([3, 1, 2])).toBe(false);
    expect(["a", "b", "c"].notSameElements(["c", "a", "b"])).toBe(false);
  });

  it("empty arrays", () => {
    expect([].notSameElements([])).toBe(false);
  });

  it("different lengths", () => {
    expect([1, 2, 3].notSameElements([1, 2])).toBe(true);
    expect([1, 2].notSameElements([1, 2, 3])).toBe(true);
    expect([1].notSameElements([])).toBe(true);
  });

  it("missing elements", () => {
    expect([1, 2, 3].notSameElements([1, 2, 4])).toBe(true);
    expect(["a", "b", "c"].notSameElements(["a", "b", "d"])).toBe(true);
  });

  it("extra elements", () => {
    expect([1, 2].notSameElements([1, 2, 3])).toBe(true);
    expect(["a", "b"].notSameElements(["a", "b", "c"])).toBe(true);
  });

  it("duplicates with same count", () => {
    expect([1, 1, 2, 3].notSameElements([1, 2, 1, 3])).toBe(false);
    expect(["a", "a", "b"].notSameElements(["a", "b", "a"])).toBe(false);
  });

  it("duplicates with different count", () => {
    expect([1, 1, 2].notSameElements([1, 2, 2])).toBe(true);
    expect([1, 1, 1].notSameElements([1, 1])).toBe(true);
    expect(["a", "a"].notSameElements(["a", "a", "a"])).toBe(true);
  });

  it("all same elements", () => {
    expect([1, 1, 1].notSameElements([1, 1, 1])).toBe(false);
    expect(["x", "x", "x", "x"].notSameElements(["x", "x", "x", "x"])).toBe(false);
  });

  it("mixed data types", () => {
    expect([1, "2", true].notSameElements([true, 1, "2"])).toBe(false);
    expect([1, "1"].notSameElements(["1", 1])).toBe(false);
    expect([0, false].notSameElements([false, 0])).toBe(false);
  });

  it("objects and arrays use reference equality", () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const arr1 = [1, 2];
    const arr2 = [1, 2];
    expect([obj1, arr1].notSameElements([obj1, arr1])).toBe(false);
    expect([obj1, arr1].notSameElements([obj2, arr2])).toBe(true); // Different references
  });

  it("special values", () => {
    expect([null, undefined].notSameElements([undefined, null])).toBe(false);
    expect([0, -0].notSameElements([-0, 0])).toBe(false);
    expect([Infinity, -Infinity].notSameElements([-Infinity, Infinity])).toBe(false);
  });

  it("single element arrays", () => {
    expect([1].notSameElements([1])).toBe(false);
    expect([1].notSameElements([2])).toBe(true);
    expect(["a"].notSameElements(["a"])).toBe(false);
  });

  it("subset/superset cases", () => {
    expect([1, 2].notSameElements([1, 2, 3])).toBe(true);
    expect([1, 2, 3].notSameElements([1, 2])).toBe(true);
    expect([1, 2, 3].notSameElements([1, 2, 3, 4])).toBe(true);
  });

  it("complex duplicate patterns", () => {
    expect([1, 1, 2, 2, 3].notSameElements([2, 1, 3, 1, 2])).toBe(false);
    expect([1, 1, 2, 2, 3].notSameElements([1, 2, 2, 3, 3])).toBe(true);
    expect([1, 1, 1, 2, 2].notSameElements([1, 2, 1, 2, 1])).toBe(false);
  });

  // Large arrays (performance boundary)
  it("arrays at size boundary", () => {
    const arr1 = Array.from({ length: 50 }, (_, i) => i);
    const arr2 = Array.from({ length: 50 }, (_, i) => 49 - i);
    const arr3 = Array.from({ length: 50 }, (_, i) => i % 10);
    expect(arr1.notSameElements(arr2)).toBe(false);
    expect(arr1.notSameElements(arr3)).toBe(true);
  });
});
