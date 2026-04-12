import "./index";

describe("hasOnlyOneElement", () => {
  it("returns true for a single-element array", () => {
    expect(["a"].hasOnlyOneElement()).toBe(true);
  });

  it("returns false for empty and multi-element arrays", () => {
    expect([].hasOnlyOneElement()).toBe(false);
    expect(["a", "b"].hasOnlyOneElement()).toBe(false);
  });

  it("narrows first for mutable arrays", () => {
    const a = ["a"] as string[];

    // @ts-expect-error `first` can be undefined before narrowing.
    expectString(a.first);

    if (a.hasOnlyOneElement()) {
      expectString(a.first);

      const onlyOne: [string] & { first: string } = a;

      expect(onlyOne).toEqual(["a"]);
      expect(a.first).toBe("a");
    }
  });

  it("narrows first for readonly arrays", () => {
    const a: readonly string[] = ["a"];

    if (a.hasOnlyOneElement()) {
      expectString(a.first);

      const onlyOne: readonly [string] & { first: string } = a;

      expect(onlyOne).toEqual(["a"]);
      expect(a.first).toBe("a");
    }
  });
});

function expectString(_value: string): void {}
