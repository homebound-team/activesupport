import { hasSameElements } from "./hasSameElements.impl";

describe("hasSameElements", () => {
  it("basic identical arrays", () => {
    expect(hasSameElements([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(hasSameElements(["a", "b", "c"], ["a", "b", "c"])).toBe(true);
  });

  it("different order, same elements", () => {
    expect(hasSameElements([1, 2, 3], [3, 1, 2])).toBe(true);
    expect(hasSameElements(["a", "b", "c"], ["c", "a", "b"])).toBe(true);
  });

  it("empty arrays", () => {
    expect(hasSameElements([], [])).toBe(true);
  });

  it("different lengths", () => {
    expect(hasSameElements([1, 2, 3], [1, 2])).toBe(false);
    expect(hasSameElements([1, 2], [1, 2, 3])).toBe(false);
    expect(hasSameElements([1], [])).toBe(false);
  });

  it("missing elements", () => {
    expect(hasSameElements([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(hasSameElements(["a", "b", "c"], ["a", "b", "d"])).toBe(false);
  });

  it("extra elements", () => {
    expect(hasSameElements([1, 2], [1, 2, 3])).toBe(false);
    expect(hasSameElements(["a", "b"], ["a", "b", "c"])).toBe(false);
  });

  it("duplicates with same count", () => {
    expect(hasSameElements([1, 1, 2, 3], [1, 2, 1, 3])).toBe(true);
    expect(hasSameElements(["a", "a", "b"], ["a", "b", "a"])).toBe(true);
  });

  it("duplicates with different count", () => {
    expect(hasSameElements([1, 1, 2], [1, 2, 2])).toBe(false);
    expect(hasSameElements([1, 1, 1], [1, 1])).toBe(false);
    expect(hasSameElements(["a", "a"], ["a", "a", "a"])).toBe(false);
  });

  it("all same elements", () => {
    expect(hasSameElements([1, 1, 1], [1, 1, 1])).toBe(true);
    expect(hasSameElements(["x", "x", "x", "x"], ["x", "x", "x", "x"])).toBe(true);
  });

  it("mixed data types", () => {
    expect(hasSameElements([1, "2", true], [true, 1, "2"])).toBe(true);
    expect(hasSameElements([1, "1"], ["1", 1])).toBe(true);
    expect(hasSameElements([0, false], [false, 0])).toBe(true);
  });

  it("objects and arrays use reference equality", () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const arr1 = [1, 2];
    const arr2 = [1, 2];
    expect(hasSameElements([obj1, arr1], [obj1, arr1])).toBe(true);
    expect(hasSameElements([obj1, arr1], [obj2, arr2])).toBe(false); // Different references
  });

  it("special values", () => {
    expect(hasSameElements([null, undefined], [undefined, null])).toBe(true);
    expect(hasSameElements([0, -0], [-0, 0])).toBe(true);
    expect(hasSameElements([Infinity, -Infinity], [-Infinity, Infinity])).toBe(true);
  });

  it("single element arrays", () => {
    expect(hasSameElements([1], [1])).toBe(true);
    expect(hasSameElements([1], [2])).toBe(false);
    expect(hasSameElements(["a"], ["a"])).toBe(true);
  });

  it("subset/superset cases", () => {
    expect(hasSameElements([1, 2], [1, 2, 3])).toBe(false);
    expect(hasSameElements([1, 2, 3], [1, 2])).toBe(false);
    expect(hasSameElements([1, 2, 3], [1, 2, 3, 4])).toBe(false);
  });

  it("complex duplicate patterns", () => {
    expect(hasSameElements([1, 1, 2, 2, 3], [2, 1, 3, 1, 2])).toBe(true);
    expect(hasSameElements([1, 1, 2, 2, 3], [1, 2, 2, 3, 3])).toBe(false);
    expect(hasSameElements([1, 1, 1, 2, 2], [1, 2, 1, 2, 1])).toBe(true);
  });

  // Large arrays (performance boundary)
  it("arrays at size boundary", () => {
    const arr1 = Array.from({ length: 50 }, (_, i) => i);
    const arr2 = Array.from({ length: 50 }, (_, i) => 49 - i);
    const arr3 = Array.from({ length: 50 }, (_, i) => i % 10);
    expect(hasSameElements(arr1, arr2)).toBe(true);
    expect(hasSameElements(arr1, arr3)).toBe(false);
  });
});
