import "./minBy";

describe("minBy", () => {
  it("should return minimum element by based on the callback", () => {
    const objects = [{ value: 3 }, { value: 1 }, { value: 4 }];
    expect(objects.minBy((o) => o.value)).toEqual({ value: 1 });
  });

  it("should return undefined for empty array", () => {
    expect([].minBy((n) => n)).toBeUndefined();
  });
});
