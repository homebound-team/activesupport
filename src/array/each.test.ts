import "./index";

describe("each", () => {
  it("runs the callback for each element in the array then returns the array itself", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call each with a callback
    const callback = jest.fn(() => Promise.resolve());
    const result = a.each(callback);
    // then we expect that callback to have been called for every element and the array to be returned
    expect(result).toBe(a);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith("a", 0, a);
    expect(callback).toHaveBeenCalledWith("b", 1, a);
    expect(callback).toHaveBeenCalledWith("c", 2, a);
  });
});
