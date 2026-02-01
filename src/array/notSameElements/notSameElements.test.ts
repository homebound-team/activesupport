import { notSameElements } from "./notSameElements.impl";

describe("notSameElements", () => {
  it("basic identical arrays", () => {
    expect(notSameElements([1, 2, 3], [1, 2, 3])).toBe(false);
    expect(notSameElements(["a", "b", "c"], ["a", "b", "c"])).toBe(false);
  });

  it("different order, same elements", () => {
    expect(notSameElements([1, 2, 3], [3, 1, 2])).toBe(false);
    expect(notSameElements(["a", "b", "c"], ["c", "a", "b"])).toBe(false);
  });

  it("empty arrays", () => {
    expect(notSameElements([], [])).toBe(false);
  });

  it("different lengths", () => {
    expect(notSameElements([1, 2, 3], [1, 2])).toBe(true);
    expect(notSameElements([1, 2], [1, 2, 3])).toBe(true);
    expect(notSameElements([1], [])).toBe(true);
  });

  it("missing elements", () => {
    expect(notSameElements([1, 2, 3], [1, 2, 4])).toBe(true);
    expect(notSameElements(["a", "b", "c"], ["a", "b", "d"])).toBe(true);
  });

  it("extra elements", () => {
    expect(notSameElements([1, 2], [1, 2, 3])).toBe(true);
    expect(notSameElements(["a", "b"], ["a", "b", "c"])).toBe(true);
  });

  it("duplicates with same count", () => {
    expect(notSameElements([1, 1, 2, 3], [1, 2, 1, 3])).toBe(false);
    expect(notSameElements(["a", "a", "b"], ["a", "b", "a"])).toBe(false);
  });

  it("duplicates with different count", () => {
    expect(notSameElements([1, 1, 2], [1, 2, 2])).toBe(true);
    expect(notSameElements([1, 1, 1], [1, 1])).toBe(true);
    expect(notSameElements(["a", "a"], ["a", "a", "a"])).toBe(true);
  });

  it("all same elements", () => {
    expect(notSameElements([1, 1, 1], [1, 1, 1])).toBe(false);
    expect(notSameElements(["x", "x", "x", "x"], ["x", "x", "x", "x"])).toBe(false);
  });

  it("mixed data types", () => {
    expect(notSameElements([1, "2", true], [true, 1, "2"])).toBe(false);
    expect(notSameElements([1, "1"], ["1", 1])).toBe(false);
    expect(notSameElements([0, false], [false, 0])).toBe(false);
  });

  it("objects and arrays use reference equality", () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const arr1 = [1, 2];
    const arr2 = [1, 2];
    expect(notSameElements([obj1, arr1], [obj1, arr1])).toBe(false);
    expect(notSameElements([obj1, arr1], [obj2, arr2])).toBe(true); // Different references
  });

  it("special values", () => {
    expect(notSameElements([null, undefined], [undefined, null])).toBe(false);
    expect(notSameElements([0, -0], [-0, 0])).toBe(false);
    expect(notSameElements([Infinity, -Infinity], [-Infinity, Infinity])).toBe(false);
  });

  it("single element arrays", () => {
    expect(notSameElements([1], [1])).toBe(false);
    expect(notSameElements([1], [2])).toBe(true);
    expect(notSameElements(["a"], ["a"])).toBe(false);
  });

  it("subset/superset cases", () => {
    expect(notSameElements([1, 2], [1, 2, 3])).toBe(true);
    expect(notSameElements([1, 2, 3], [1, 2])).toBe(true);
    expect(notSameElements([1, 2, 3], [1, 2, 3, 4])).toBe(true);
  });

  it("complex duplicate patterns", () => {
    expect(notSameElements([1, 1, 2, 2, 3], [2, 1, 3, 1, 2])).toBe(false);
    expect(notSameElements([1, 1, 2, 2, 3], [1, 2, 2, 3, 3])).toBe(true);
    expect(notSameElements([1, 1, 1, 2, 2], [1, 2, 1, 2, 1])).toBe(false);
  });

  // Large arrays (performance boundary)
  it("arrays at size boundary", () => {
    const arr1 = Array.from({ length: 50 }, (_, i) => i);
    const arr2 = Array.from({ length: 50 }, (_, i) => 49 - i);
    const arr3 = Array.from({ length: 50 }, (_, i) => i % 10);
    expect(notSameElements(arr1, arr2)).toBe(false);
    expect(notSameElements(arr1, arr3)).toBe(true);
  });
});
