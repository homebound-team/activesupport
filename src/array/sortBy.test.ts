import "./index";

describe("sortBy", () => {
  it("sorts using specified the specified function", () => {
    expect([1, 2, 3].sortBy((n: number) => -n)).toEqual([3, 2, 1]);
  });

  it("sorts by two values", () => {
    const foos: { foo: number; bar: number }[] = [
      { foo: 3, bar: 2 },
      { foo: 1, bar: 0 },
      { foo: 3, bar: 1 },
      { foo: 2, bar: 0 },
    ];
    expect(foos.sortBy((f) => [f.foo, f.bar])).toEqual([
      { foo: 1, bar: 0 },
      { foo: 2, bar: 0 },
      { foo: 3, bar: 1 },
      { foo: 3, bar: 2 },
    ]);
  });

  it("works for bigint fields", () => {
    // Using `any` here as an easy case for the compiler not being able to catch the error
    const foos: { foo: bigint }[] = [{ foo: 3n }, { foo: -1n }, { foo: 2n }];
    expect(foos.sortBy((f) => f.foo)).toEqual([{ foo: -1n }, { foo: 2n }, { foo: 3n }]);
  });
});

describe("sortByKey", () => {
  it("throws on unsupported value types in sortByKey", () => {
    // Using `any` here as an easy case for the compiler not being able to catch the error
    const foos: { foo: any }[] = [{ foo: {} }, { foo: {} }];
    expect(() => foos.sortByKey("foo")).toThrow("Unsupported compare");
  });

  it("works for bigint fields", () => {
    // Using `any` here as an easy case for the compiler not being able to catch the error
    const foos: { foo: bigint }[] = [{ foo: 3n }, { foo: -1n }, { foo: 2n }];
    expect(foos.sortByKey("foo")).toEqual([{ foo: -1n }, { foo: 2n }, { foo: 3n }]);
  });
});
