import "./index";

describe("groupBy", () => {
  it("returns a record of arrays keyed by the callback", () => {
    // Given an array of structs
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "c", bar: 3 },
    ];
    // When we call groupBy with a field
    const result = a.groupBy((el) => el.foo);
    // Then we get back a record with each struct keyed by its value for that field
    expect(result).toEqual({
      a: [{ foo: "a", bar: 1 }],
      b: [{ foo: "b", bar: 2 }],
      c: [{ foo: "c", bar: 3 }],
    });
  });

  it("combines elements with the same key in an array", () => {
    // Given an array of structs with colliding elements
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "a", bar: 3 },
    ];
    // When we call groupBy with a field that collides
    const result = a.groupBy((el) => el.foo);
    // Then we get an error
    expect(result).toEqual({
      a: [
        { foo: "a", bar: 1 },
        { foo: "a", bar: 3 },
      ],
      b: [{ foo: "b", bar: 2 }],
    });
  });

  it("returns values from the value callback", () => {
    // Given an array of structs
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "a", bar: 3 },
    ];
    // When we call groupBy with a callback that returns a custom string
    const result = a.groupBy(
      (el) => el.foo,
      (el) => el.bar,
    );
    // Then we get back a record with the keys from the key callback and values from the value callback
    expect(result).toEqual({
      a: [1, 3],
      b: [2],
    });
  });
});

describe("groupByObject", () => {
  it("returns an array of arrays of the key plus values for each unique value from the callback", () => {
    // Given an array of structs
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "c", bar: 3 },
    ];
    // When we call groupBy with a field
    const result = a.groupByObject((el) => el.foo);
    // Then we get back a record with each struct keyed by its value for that field
    expect(result).toEqual([
      ["a", [{ foo: "a", bar: 1 }]],
      ["b", [{ foo: "b", bar: 2 }]],
      ["c", [{ foo: "c", bar: 3 }]],
    ]);
  });

  it("combines elements with the same key in an array", () => {
    // Given an array of structs with colliding elements
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "a", bar: 3 },
    ];
    // When we call groupBy with a field that collides
    const result = a.groupByObject((el) => el.foo);
    // Then we get an error
    expect(result).toEqual([
      [
        "a",
        [
          { foo: "a", bar: 1 },
          { foo: "a", bar: 3 },
        ],
      ],
      ["b", [{ foo: "b", bar: 2 }]],
    ]);
  });

  it("returns values from the value callback", () => {
    // Given an array of structs
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "a", bar: 3 },
    ];
    // When we call groupBy with a callback that returns a custom string
    const result = a.groupByObject(
      (el) => el.foo,
      (el) => el.bar,
    );
    // Then we get back a record with the keys from the key callback and values from the value callback
    expect(result).toEqual([
      ["a", [1, 3]],
      ["b", [2]],
    ]);
  });
});
