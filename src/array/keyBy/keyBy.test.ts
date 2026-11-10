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

  it("types the record by the field's value type", () => {
    // Given a readonly array of structs with string and number fields
    const a: readonly { foo: "a" | "b"; bar: number; baz: boolean; qux?: string }[] = [
      { foo: "a", bar: 1, baz: true },
      { foo: "b", bar: 2, baz: false },
    ];
    // When we key by a string field, then the keys are the field's value type
    const byFoo: Record<"a" | "b", (typeof a)[number]> = keyBy(a, "foo");
    expect(byFoo.b.bar).toBe(2);
    // And when we key by a number field, then the keys are numbers
    const byBar: Record<number, (typeof a)[number]> = keyBy(a, "bar");
    expect(byBar[1].foo).toBe("a");
    // And fields that can't be record keys are compile errors (checked by tsc, never run)
    () => {
      // @ts-expect-error a boolean field can't be a record key
      keyBy(a, "baz");
      // @ts-expect-error an optional field may be undefined, so it can't be a record key
      keyBy(a, "qux");
      // @ts-expect-error not a field
      keyBy(a, "nope");
    };
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
