import "./index";

describe("findAndRemove", () => {
  it("finds an object", () => {
    const result = [1, 2, 3, 4].findAndRemove((i) => i === 2);
    expect(result).toBe(2);
  });

  it("modifies the original array", () => {
    const arr = [1, 2, 3, 4];
    arr.findAndRemove((i) => i === 2);
    expect(arr.length).toBe(3);
    expect(arr.indexOf(2)).toBe(-1);
  });
});
