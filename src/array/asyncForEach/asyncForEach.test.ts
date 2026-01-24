import "./index";

describe("asyncForEach", () => {
  it("awaits the callback for each element in the array ", async () => {
    // given an array of strings
    const a = ["a", "b", "c"];
    // when we call asyncForEach with a callback
    const callback = jest.fn(() => Promise.resolve());
    await a.asyncForEach(callback);
    // then we expect that callback to have been called for every number
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith("a", 0, a);
    expect(callback).toHaveBeenCalledWith("b", 1, a);
    expect(callback).toHaveBeenCalledWith("c", 2, a);
  });
});
