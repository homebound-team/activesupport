import "./index";

describe("sum", () => {
  it("returns the sum of all numbers in an array", () => {
    // Given an array of numbers
    const a = [5, 6, 7];
    // When we call sum
    const result = a.sum();
    // Then we get back the sum of the numbers
    expect(result).toBe(18);
  });

  it("ignores undefined values", () => {
    // Given an array of numbers and undefined values
    const a = [5, 6, undefined, 7];
    // When we call sum
    const result = a.sum();
    // Then we get back the sum of the numbers
    expect(result).toBe(18);
  });

  it("returns 0 for an empty array", () => {
    // Given an array of numbers and undefined values
    const a = [];
    // When we call sum
    const result = a.sum();
    // Then we get back the sum of the numbers
    expect(result).toBe(0);
  });

  it("returns 0 for an array with only undefined values", () => {
    // Given an array of numbers and undefined values
    const a = [undefined];
    // When we call sum
    const result = a.sum();
    // Then we get back the sum of the numbers
    expect(result).toBe(0);
  });

  it("returns the sum of the return values of a callback", () => {
    // Given an array of strings
    const a = ["5", "6", "7"];
    // When we call sum with a callback that converts the strings to numbers
    const result = a.sum((v) => parseInt(v));
    // Then we get back the sum of the numbers
    expect(result).toBe(18);
  });

  it("works with a callback that returns a promise", async () => {
    // Given an array of strings
    const a = ["5", "6", "7"];
    // When we call sum with a callback that converts the strings to numbers as a promise
    const result = await a.sum((v) => Promise.resolve(parseInt(v)));
    // Then we get back the sum of the numbers
    expect(result).toBe(18);
  });

  it("works for bigints", () => {
    // Given an array of bigints and undefined values
    const a = [5n, undefined, 6n, 7n];
    // When we call sum
    const result = a.sum();
    // Then we get back the sum of the bigints as a bigint
    expect(result).toBe(18n);
  });
});

describe("maybeSum", () => {
  it("returns the maybeSum of all numbers in an array", () => {
    // Given an array of numbers
    const a = [5, 6, 7];
    // When we call maybeSum
    const result = a.maybeSum();
    // Then we get back the maybeSum of the numbers
    expect(result).toBe(18);
  });

  it("ignores undefined values", () => {
    // Given an array of numbers and undefined values
    const a = [5, 6, undefined, 7];
    // When we call maybeSum
    const result = a.maybeSum();
    // Then we get back the maybeSum of the numbers
    expect(result).toBe(18);
  });

  it("returns undefined for an empty array", () => {
    // Given an array of numbers and undefined values
    const a = [];
    // When we call maybeSum
    const result = a.maybeSum();
    // Then we get back the maybeSum of the numbers
    expect(result).toBeUndefined();
  });

  it("returns undefined for an array with only undefined values", () => {
    // Given an array of numbers and undefined values
    const a = [undefined];
    // When we call maybeSum
    const result = a.maybeSum();
    // Then we get back the maybeSum of the numbers
    expect(result).toBeUndefined();
  });

  it("returns the maybeSum of the return values of a callback", () => {
    // Given an array of strings
    const a = ["5", "6", "7"];
    // When we call maybeSum with a callback that converts the strings to numbers
    const result = a.maybeSum((v) => parseInt(v));
    // Then we get back the maybeSum of the numbers
    expect(result).toBe(18);
  });

  it("works with a callback that returns a promise", async () => {
    // Given an array of strings
    const a = ["5", "6", "7"];
    // When we call maybeSum with a callback that converts the strings to numbers as a promise
    const result = await a.maybeSum((v) => Promise.resolve(parseInt(v)));
    // Then we get back the maybeSum of the numbers
    expect(result).toBe(18);
  });

  it("works for bigints", () => {
    // Given an array of bigints and undefined values
    const a = [5n, undefined, 6n, 7n];
    // When we call maybeSum
    const result = a.maybeSum();
    // Then we get back the sum of the bigints as a bigint
    expect(result).toBe(18n);
  });
});
