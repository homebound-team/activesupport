import { keyBy } from "./keyBy.impl";

describe("keyBy", () => {
  it("returns a record keyed by the given field", () => {
    // Given an array of structs
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "c", bar: 3 },
    ];
    // When we call keyBy with a field
    const result = keyBy(a, "foo");
    // Then we get back a record with each struct keyed by its value for that field
    expect(result).toEqual({
      a: { foo: "a", bar: 1 },
      b: { foo: "b", bar: 2 },
      c: { foo: "c", bar: 3 },
    });
  });

  it("throws when elements generate duplicate keys", () => {
    // Given an array of structs with colliding elements
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "a", bar: 3 },
    ];
    // When we call keyBy with a field that collides
    const result = () => keyBy(a, "foo");
    // Then we get an error
    expect(result).toThrow("a already had a value assigned");
  });

  it("does not throw when duplicate keys are generated for the same value", () => {
    // Given an array of structs with colliding elements
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "a", bar: 1 },
    ];
    // When we call keyBy with a callback that collides but produces the same values
    const result = keyBy(
      a,
      (el) => el.foo,
      (el) => el.bar,
    );
    // Then we get back a record with unique key/value pairs
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("returns a record keyed by the result of the callback", () => {
    // Given an array of structs
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "c", bar: 3 },
    ];
    // When we call keyBy with a callback that returns a custom string
    const result = keyBy(a, (el) => `${el.foo}.${el.bar}`);
    // Then we get back a record with each struct keyed by its return from the callback
    expect(result).toEqual({
      "a.1": { foo: "a", bar: 1 },
      "b.2": { foo: "b", bar: 2 },
      "c.3": { foo: "c", bar: 3 },
    });
  });

  it("returns a record keyed by the result of the callback with values from the value callback", () => {
    // Given an array of structs
    const a = [
      { foo: "a", bar: 1 },
      { foo: "b", bar: 2 },
      { foo: "c", bar: 3 },
    ];
    // When we call keyBy with a callback that returns a custom string
    const result = keyBy(
      a,
      (el) => el.foo,
      (el) => el.bar,
    );
    // Then we get back a record with the keys from the key callback and values from the value callback
    expect(result).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});
