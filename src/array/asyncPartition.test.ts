import "./index";

describe("partition", () => {
  it("works on empty arrays", async () => {
    expect(await [].asyncPartition((f: number) => Promise.resolve(f === 0))).toEqual([[], []]);
  });

  it("separates an array into two arrays using an async predicate", async () => {
    expect(await [1, 2, 3, 4, 5, 6].asyncPartition((f: number) => Promise.resolve(f % 2 === 0))).toEqual([
      [2, 4, 6],
      [1, 3, 5],
    ]);
  });

  it("returns the partition mapped by the value callback", async () => {
    expect(
      await [1, 2, 3, 4, 5, 6].asyncPartition(
        (f: number) => Promise.resolve(f % 2 === 0),
        (v) => Promise.resolve(v * 2),
      ),
    ).toEqual([
      [4, 8, 12],
      [2, 6, 10],
    ]);
  });
});
