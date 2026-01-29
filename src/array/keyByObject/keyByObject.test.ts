import "./keyByObject.global";

describe("keyByObject", () => {
  it("throws when elements generate duplicate keys", () => {
    // Given an array of structs with colliding elements
    const duplicateFoo = { a: 5 };
    const a = [
      { foo: duplicateFoo, bar: 1 },
      { foo: "b", bar: 2 },
      { foo: duplicateFoo, bar: 3 },
    ];
    // When we call keyByObject with a callback that collides
    const result = () => a.keyByObject((el) => el.foo);
    // Then we get an error
    expect(result).toThrow("already had a value assigned");
  });

  it("does not throw when duplicate keys are generated for the same value", () => {
    // Given an array of structs with colliding elements
    const duplicateFoo = { a: 5 };
    const a = [
      { foo: duplicateFoo, bar: 1 },
      { foo: "b", bar: 2 },
      { foo: duplicateFoo, bar: 1 },
    ];
    // When we call keyByObject with a callback that collides but produces the same values
    const result = a.keyByObject(
      (el) => el.foo,
      (el) => el.bar,
    );
    // Then we get a map with unique key/value pairs
    expect(result).toEqual(
      new Map<any, number>([
        [{ a: 5 }, 1],
        ["b", 2],
      ]),
    );
  });

  it("returns a map keyed by the result of the callback", () => {
    // Given an array of structs
    const a = [
      { foo: { a: 2 }, bar: 1 },
      { foo: { a: 3 }, bar: 2 },
      { foo: { a: 4 }, bar: 3 },
    ];
    // When we call keyByObject
    const result = a.keyByObject((el) => el.foo);
    // Then we get back a record with each struct keyed by its return from the callback
    expect(result).toEqual(
      new Map([
        [{ a: 2 }, { foo: { a: 2 }, bar: 1 }],
        [{ a: 3 }, { foo: { a: 3 }, bar: 2 }],
        [{ a: 4 }, { foo: { a: 4 }, bar: 3 }],
      ]),
    );
  });

  it("returns a map keyed by the result of the callback with values from the value callback", () => {
    // Given an array of structs
    const a = [
      { foo: { a: 2 }, bar: 1 },
      { foo: { a: 3 }, bar: 2 },
      { foo: { a: 4 }, bar: 3 },
    ];
    // When we call keyByObject with key and value callbacks
    const result = a.keyByObject(
      (el) => el.foo,
      (el) => el.bar,
    );
    // Then we get back a map with the keys from the key callback and values from the value callback
    expect(result).toEqual(
      new Map([
        [{ a: 2 }, 1],
        [{ a: 3 }, 2],
        [{ a: 4 }, 3],
      ]),
    );
  });
});
