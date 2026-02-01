import { findAndRemove } from "./findAndRemove.impl";

describe("findAndRemove", () => {
  it("finds an object", () => {
    const arr = [1, 2, 3, 4];
    const result = findAndRemove(arr, (i) => i === 2);
    expect(result).toBe(2);
  });

  it("modifies the original array", () => {
    const arr = [1, 2, 3, 4];
    findAndRemove(arr, (i) => i === 2);
    expect(arr.length).toBe(3);
    expect(arr.indexOf(2)).toBe(-1);
  });
});
