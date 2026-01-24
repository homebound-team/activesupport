import "./index";

describe("remove", () => {
  it("removes an element from an array", () => {
    // Given an array of strings
    const a = ["a", "b", "c"];
    // When we remove an element
    a.remove("b");
    // Then the array is mutated and the element removed
    expect(a).toEqual(["a", "c"]);
  });

  it("removes multiple elements from an array", () => {
    // Given an array of strings
    const a = ["a", "b", "c", "d", "e"];
    // When we remove an element
    a.remove("b", "d");
    // Then the array is mutated and the element removed
    expect(a).toEqual(["a", "c", "e"]);
  });

  it("handles removing non-existent elements", () => {
    // Given an array of strings
    const a = ["a", "b", "c"];
    // When we remove a non-existent element
    a.remove("x");
    // Then the array remains unchanged
    expect(a).toEqual(["a", "b", "c"]);
  });

  it("handles removing from an empty array", () => {
    // Given an empty array
    const a: string[] = [];
    // When we remove an element
    a.remove("a");
    // Then the array remains empty
    expect(a).toEqual([]);
  });

  it("removes all occurrences of duplicate elements", () => {
    // Given an array with duplicates
    const a = ["a", "b", "b", "c", "b"];
    // When we remove the duplicate element
    a.remove("b");
    // Then all occurrences are removed
    expect(a).toEqual(["a", "c"]);
  });

  it("removes multiple elements including duplicates", () => {
    // Given an array with duplicates
    const a = ["a", "b", "b", "c", "c", "d"];
    // When we remove multiple elements
    a.remove("b", "c");
    // Then all occurrences of both elements are removed
    expect(a).toEqual(["a", "d"]);
  });

  it("works with numbers", () => {
    // Given an array of numbers
    const a = [1, 2, 3, 4, 5];
    // When we remove a number
    a.remove(3);
    // Then the number is removed
    expect(a).toEqual([1, 2, 4, 5]);
  });

  it("works with objects using reference equality", () => {
    // Given an array of objects
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const a = [obj1, obj2, obj3];
    // When we remove an object by reference
    a.remove(obj2);
    // Then the object is removed
    expect(a).toEqual([obj1, obj3]);
  });

  it("does not remove objects with same properties but different references", () => {
    // Given an array of objects
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const a = [obj1, obj2, obj3];
    // When we try to remove an object with same properties but different reference
    a.remove({ id: 2 } as any);
    // Then the original object remains
    expect(a).toEqual([obj1, obj2, obj3]);
  });

  it("handles removing with no arguments", () => {
    // Given an array
    const a = ["a", "b", "c"];
    // When we call remove with no arguments
    a.remove();
    // Then the array remains unchanged
    expect(a).toEqual(["a", "b", "c"]);
  });

  it("removes all elements when all are specified", () => {
    // Given an array
    const a = ["a", "b", "c"];
    // When we remove all elements
    a.remove("a", "b", "c");
    // Then the array becomes empty
    expect(a).toEqual([]);
  });

  it("works with mixed types in a union type array", () => {
    // Given an array of mixed types
    const a: (string | number)[] = ["a", 1, "b", 2, "c"];
    // When we remove elements of different types
    a.remove("b", 2);
    // Then both types are removed correctly
    expect(a).toEqual(["a", 1, "c"]);
  });

  it("handles undefined and null values", () => {
    // Given an array with undefined and null
    const a = ["a", undefined, "b", null, "c"];
    // When we remove undefined and null
    a.remove(undefined, null);
    // Then they are removed
    expect(a).toEqual(["a", "b", "c"]);
  });

  it("preserves array order when removing elements", () => {
    // Given an array with specific order
    const a = [1, 5, 2, 8, 3, 9, 4];
    // When we remove some elements
    a.remove(2, 8, 9);
    // Then the remaining elements maintain their relative order
    expect(a).toEqual([1, 5, 3, 4]);
  });
});
