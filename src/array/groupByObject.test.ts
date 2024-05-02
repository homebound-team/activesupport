import "./index";

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
