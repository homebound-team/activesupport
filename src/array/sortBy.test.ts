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
    // And the types work for readonly arrays
    expect((foos as Readonly<typeof foos>).sortBy((f) => [f.foo, f.bar])).toEqual([
      { foo: 1, bar: 0 },
      { foo: 2, bar: 0 },
      { foo: 3, bar: 1 },
      { foo: 3, bar: 2 },
    ]);
  });

  it("sorts by three values with infinity mixed in", () => {
    const foos: { foo: number | undefined; bar: number | undefined; zaz: number | undefined }[] = [
      { foo: 2, bar: undefined, zaz: 2 }, // fourth (3rd bar)
      { foo: 1, bar: undefined, zaz: undefined }, // first
      { foo: 2, bar: undefined, zaz: 1 }, // third (2nd bar)
      { foo: 2, bar: 0, zaz: 1 }, // second (1st bar)
      { foo: 3, bar: 0, zaz: 0 }, // last
    ];
    expect(
      foos.sortBy((f) => {
        return [f.foo, f.bar ?? Infinity, f.zaz ?? Infinity];
      }),
    ).toEqual([
      { foo: 1, bar: undefined, zaz: undefined },
      { foo: 2, bar: 0, zaz: 1 },
      { foo: 2, bar: undefined, zaz: 1 },
      { foo: 2, bar: undefined, zaz: 2 },
      { foo: 3, bar: 0, zaz: 0 },
    ]);
  });

  it("sorts by multiple values must be fixed array", () => {
    const foos: { foo: number; bar: number }[] = [
      { foo: 3, bar: 2 },
      { foo: 1, bar: 0 },
    ];
    expect(() => {
      foos.sortBy((f) => {
        return f.foo === 3 ? [f.foo] : [f.foo, f.bar];
      });
    }).toThrow("cannot compare arrays of different lengths");
  });

  it("works for bigint fields", () => {
    // Using `any` here as an easy case for the compiler not being able to catch the error
    const foos: { foo: bigint }[] = [{ foo: 3n }, { foo: -1n }, { foo: 2n }];
    expect(foos.sortBy((f) => f.foo)).toEqual([{ foo: -1n }, { foo: 2n }, { foo: 3n }]);
  });

  it("handles NaN values consistently", () => {
    // NaN should sort to the end (similar to how nullish values often do)
    const nums = [3, NaN, 1, NaN, 2];
    expect(nums.sortBy((n) => n)).toEqual([1, 2, 3, NaN, NaN]);
  });

  it("handles Infinity values consistently", () => {
    const nums = [3, Infinity, 1, -Infinity, 2];
    expect(nums.sortBy((n) => n)).toEqual([-Infinity, 1, 2, 3, Infinity]);
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
