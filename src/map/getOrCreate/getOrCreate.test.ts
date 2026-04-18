import { getOrCreate } from "./getOrCreate.impl";

describe("getOrCreate", () => {
  it("returns existing entities", () => {
    const m = new Map();
    m.set("foo", "bar");
    expect(getOrCreate(m, "foo", () => "baz")).toBe("bar");
  });

  it("returns new items", () => {
    const m = new Map();
    expect(getOrCreate(m, "foo", () => "baz")).toBe("baz");
  });

  it("is set after creating a new item", () => {
    const m = new Map();
    getOrCreate(m, "foo", () => "baz");
    expect(m.has("foo")).toBe(true);
  });

  it("does not invoke create needlessly", () => {
    const m = new Map();
    const key = "foo";
    m.set(key, "bar");
    const fn = jest.fn().mockReturnValue("baz");
    getOrCreate(m, key, fn);
    expect(fn).not.toHaveBeenCalled();
  });

  it("does not invoke create more than once", () => {
    // given 'foo' has not been set
    const m = new Map();
    const key = "foo";
    const fn = jest.fn().mockReturnValue("baz");
    // once we getOrCreate the first time
    getOrCreate(m, key, fn);
    // then when we try it a second time
    getOrCreate(m, key, fn);
    // the fn is not invoked again
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
