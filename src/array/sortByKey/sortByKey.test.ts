import { sortByKey } from "./sortByKey.impl";

describe("sortByKey", () => {
  it("throws on unsupported value types in sortByKey", () => {
    // Using `any` here as an easy case for the compiler not being able to catch the error
    const foos: { foo: any }[] = [{ foo: {} }, { foo: {} }];
    expect(() => sortByKey(foos, "foo")).toThrow("Unsupported compare");
  });

  it("works for bigint fields", () => {
    // Using `any` here as an easy case for the compiler not being able to catch the error
    const foos: { foo: bigint }[] = [{ foo: 3n }, { foo: -1n }, { foo: 2n }];
    expect(sortByKey(foos, "foo")).toEqual([{ foo: -1n }, { foo: 2n }, { foo: 3n }]);
  });
});
