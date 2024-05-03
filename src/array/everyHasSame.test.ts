import "./index";

describe("everyHasSame", () => {
  it("returns true if all elements match", () => {
    // given everything has the same 'name' property
    const a = [{ name: "Homebound" }, { name: "Homebound" }, { name: "Homebound" }];
    // then expect them to everyHasSamely match
    expect(a.everyHasSame((el) => el.name)).toBe(true);
  });

  it("returns false if elements don't match", () => {
    // given 1 item has a different name
    const a = [{ name: "Homebound" }, { name: "Homebound" }, { name: "Nikki" }];
    // then expect them NOT to be everyHasSame
    expect(a.everyHasSame((el) => el.name)).toBe(false);
  });

  it("works for simple data", () => {
    // given even numbers
    const a = [0, 2, 4, 6, 8];
    // then a check against each of them is everyHasSame
    expect(a.everyHasSame((el) => el % 2 === 0)).toBe(true);
  });

  it("returns true for arrays-of-1", () => {
    // given 1 item
    const a = [1];
    // then it is everyHasSame with itself
    expect(a.everyHasSame((el) => el)).toBe(true);
  });

  it("returns true for empty array", () => {
    // given an empty array
    const a: void[] = [];
    // then it's everyHasSamely silent
    expect(a.everyHasSame((el) => el)).toBe(true);
  });

  // This is different than "Your array had an undefined, so I passed it to you," as this
  // checks that it doesn't internally destructure `const [nullish] = []` to create an
  // undefined object to pass to fn.
  it("doesn't call fn with no element", () => {
    // given an empty array
    const a: void[] = [];
    const fn = jest.fn();
    // when `everyHasSame` is called
    a.everyHasSame(fn);
    // then fn never got invoked because there were no elements on which to invoke it
    expect(fn).not.toHaveBeenCalled();
  });

  it("doesn't call fn more than 1 extra time", () => {
    // Given 4 elements all equal 1
    const a = [1, 1, 1, 1];
    const fn = jest.fn((e) => e === 1);
    // When we call `everyHasSame`
    a.everyHasSame(fn);
    // then we get 4 calls
    expect(fn).toHaveBeenCalledTimes(4);
  });

  it("returns early if applicable", () => {
    // Given 4 elements, where an early item does not equal 1
    const a = [1, 2, 1, 1];
    const fn = jest.fn((e) => e === 1);
    // When we call `everyHasSame`
    a.everyHasSame(fn);
    // then we stopped after 2 calls (first 2 elements)
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("forces fn to deal with undefined elements if applicable", () => {
    // given an array with undefined
    const a = [1, 1, undefined, 1];
    // then failing to account for the undefined results in a type error (and an inevitable thrown error)
    expect(() =>
      a.everyHasSame((el) =>
        // @ts-expect-error - `el` should factor for possibly-undefined, i.e. `a?.toExponential()`
        el.toExponential(),
      ),
    ).toThrow();
  });
});
