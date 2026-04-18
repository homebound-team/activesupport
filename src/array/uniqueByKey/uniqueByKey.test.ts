import { uniqueByKey } from "./uniqueByKey.impl";

describe("uniqueByKey", () => {
  it("removes duplicates", () => {
    const arr = [{ foo: 1 }, { foo: 2 }, { foo: 1 }];
    const result = uniqueByKey(arr, "foo");
    expect(result).toEqual([{ foo: 1 }, { foo: 2 }]);
  });

  it("uses the first object if there are multiple matching elements in the array", () => {
    const arr = [{ foo: 1, bar: 2 }, { foo: 2 }, { foo: 1, baz: 3 }];
    const result = uniqueByKey(arr, "foo");
    expect(result).toEqual([{ foo: 1, bar: 2 }, { foo: 2 }]);
  });
});
