import "./array";

describe("array", () => {
  describe("partition", () => {
    it("works on empty arrays", () => {
      expect([].partition((f: number) => f === 0)).toEqual([[], []]);
    });

    it("separates an array into two arrays using the predicate", () => {
      expect([1, 2, 3, 4, 5, 6].partition((f: number) => f % 2 === 0)).toEqual([
        [2, 4, 6],
        [1, 3, 5],
      ]);
    });
  });

  describe("sortBy", () => {
    it("sorts using specified the specified function", () => {
      expect([1, 2, 3].sortBy((n: number) => -n)).toEqual([3, 2, 1]);
    });
  });

  describe("sortByKey", () => {
    it("throws on unsupported value types in sortByKey", () => {
      // Using `any` here as an easy case for the compiler not being able to catch the error
      const foos: { foo: any }[] = [{ foo: {} }, { foo: {} }];
      expect(() => foos.sortByKey("foo")).toThrow("Unsupported sortBy values");
    });
  });

  describe("groupByObject", () => {
    it("can group objects as-is", () => {
      type HasName = { name: string };
      const [a, b] = [{ name: "a" }, { name: "b" }] as HasName[];
      const list: Array<[HasName, number]> = [
        [a, 1],
        [a, 2],
        [b, 2],
        [a, 1],
      ];
      const grouped: Array<[HasName, number[]]> = list.groupByObject((a) => a[0]);
      expect(grouped).toEqual([
        // a's entries
        [a, [list[0], list[1], list[3]]],
        // b's entries
        [b, [list[2]]],
      ]);
    });

    it("can group objects with a value function", () => {
      type HasName = { name: string };
      const [a, b] = [{ name: "a" }, { name: "b" }] as HasName[];
      const list: Array<[HasName, number]> = [
        [a, 1],
        [a, 2],
        [b, 2],
        [a, 1],
      ];
      const grouped: Array<[HasName, number[]]> = list.groupByObject(
        (a) => a[0],
        (a) => a[1],
      );
      expect(grouped).toEqual([
        // a's entries
        [a, [1, 2, 1]],
        // b's entries
        [b, [2]],
      ]);
    });
  });

  describe("findAndRemove", () => {
    it("finds an object", () => {
      const result = [1, 2, 3, 4].findAndRemove((i) => i === 2);
      expect(result).toBe(2);
    });

    it("modifies the original array", () => {
      const arr = [1, 2, 3, 4];
      arr.findAndRemove((i) => i === 2);
      expect(arr.length).toBe(3);
      expect(arr.indexOf(2)).toBe(-1);
    });
  });

  describe("uniqueByKey", () => {
    it("removes duplicates", () => {
      const arr = [{ foo: 1 }, { foo: 2 }, { foo: 1 }];
      const result = arr.uniqueByKey("foo");
      expect(result).toEqual([{ foo: 1 }, { foo: 2 }]);
    });

    it("uses the first object if there are multiple matching elements in the array", () => {
      const arr = [{ foo: 1, bar: 2 }, { foo: 2 }, { foo: 1, baz: 3 }];
      const result = arr.uniqueByKey("foo");
      expect(result).toEqual([{ foo: 1, bar: 2 }, { foo: 2 }]);
    });
  });

  describe("unanimous", () => {
    it("returns true if all elements match", () => {
      // given everything has the same 'name' property
      const a = [{ name: "Homebound" }, { name: "Homebound" }, { name: "Homebound" }];
      // then expect them to unanimously match
      expect(a.unanimous((el) => el.name)).toBe(true);
    });

    it("returns false if elements don't match", () => {
      // given 1 item has a different name
      const a = [{ name: "Homebound" }, { name: "Homebound" }, { name: "Nikki" }];
      // then expect them NOT to be unanimous
      expect(a.unanimous((el) => el.name)).toBe(false);
    });

    it("works for simple data", () => {
      // given even numbers
      const a = [0, 2, 4, 6, 8];
      // then a check against each of them is unanimous
      expect(a.unanimous((el) => el % 2 === 0)).toBe(true);
    });

    it("returns true for arrays-of-1", () => {
      // given 1 item
      const a = [1];
      // then it is unanimous with itself
      expect(a.unanimous((el) => el)).toBe(true);
    });

    it("returns true for empty array", () => {
      // given an empty array
      const a = [];
      // then it's unanimously silent
      expect(a.unanimous((el) => el)).toBe(true);
    });
  });
});
