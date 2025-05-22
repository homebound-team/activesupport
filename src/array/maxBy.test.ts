import "./maxBy";

describe("maxBy", () => {
  it("should return maximum element by based on the callback", () => {
    const objects = [{ value: 3 }, { value: 1 }, { value: 4 }];
    expect(objects.maxBy((o) => o.value)).toEqual({ value: 4 });
  });

  it("should return undefined for empty array", () => {
    expect([].maxBy((n) => n)).toBeUndefined();
  });
});
