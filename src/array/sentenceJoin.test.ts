import "./index";

describe("sentenceJoin", () => {
  it("returns just the element as a string for a single element array", () => {
    // Given an array with a single number
    const a = [5];
    // When we run sentenceJoin
    const result = a.sentenceJoin();
    // Then we get back just the number converted to a string
    expect(result).toBe("5");
  });

  it("returns the elements as a string joined by 'and' for a two element array", () => {
    // Given an array of 2 numbers
    const a = [5, 7];
    // When we run sentenceJoin
    const result = a.sentenceJoin();
    // Then we get back just the numbers joined by 'and'
    expect(result).toBe("5 and 7");
  });

  it("returns the elements as a string joined by commas with the last element joined by 'and' for a multi element array", () => {
    // Given an array of multiple numbers
    const a = [5, 7, 9, 11];
    // When we run sentenceJoin
    const result = a.sentenceJoin();
    // Then we get back just the number converted to a string
    expect(result).toBe("5, 7, 9 and 11");
  });

  it("allows overriding the join word", () => {
    // Given an array of 2 numbers
    const a = [5, 7];
    // When we run sentenceJoin with a word
    const result = a.sentenceJoin({ word: "or" });
    // Then we get back just the number converted to a string
    expect(result).toBe("5 or 7");
  });

  it("allows overriding the join separator ", () => {
    // Given an array of 2 numbers
    const a = [5, 7, 9, 11];
    // When we run sentenceJoin with a separator
    const result = a.sentenceJoin({ separator: "." });
    // Then we get back just the number converted to a string
    expect(result).toBe("5.7.9 and 11");
  });
});
