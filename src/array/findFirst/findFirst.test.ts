import "./index";

describe("findFirst", () => {
  it("returns the first defined result from the lambda", async () => {
    // given an array of strings
    const a = ["", "hello", "world"];
    // when we call findFirst with a function that returns non-empty strings
    const result = a.findFirst((s) => s || undefined);
    // then we get the first non-empty string
    expect(result).toBe("hello");
  });

  it("returns undefined when no lambda result is defined", async () => {
    // given an array of strings
    const a = ["", "", ""];
    // when we call findFirst with a function that returns undefined for empty strings
    const result = a.findFirst((s) => s || undefined);
    // then we get undefined
    expect(result).toBeUndefined();
  });

  it("returns undefined for an empty array", async () => {
    // given an empty array
    const a: string[] = [];
    // when we call findFirst
    const result = a.findFirst((s) => s);
    // then we get undefined
    expect(result).toBeUndefined();
  });

  it("works with type transformation", async () => {
    // given an array of strings
    const a = ["not a number", "42", "100"];
    // when we call findFirst with a function that parses numbers
    const result = a.findFirst((s) => {
      const num = parseInt(s);
      return isNaN(num) ? undefined : num;
    });
    // then we get the first parsed number
    expect(result).toBe(42);
  });

  it("stops at the first defined result", async () => {
    // given an array
    const a = [1, 2, 3, 4, 5];
    const mockFn = jest.fn((n: number) => (n > 2 ? n * 10 : undefined));
    // when we call findFirst
    const result = a.findFirst(mockFn);
    // then we get the first result and the function stops being called
    expect(result).toBe(30);
    expect(mockFn).toHaveBeenCalledTimes(3); // called for 1, 2, 3 only
  });
});
