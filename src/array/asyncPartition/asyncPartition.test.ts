import "./asyncPartition.global";

describe("partition", () => {
  it("works on empty arrays", async () => {
    const arr = [] as number[];
    const result = await arr.asyncPartition((f) => Promise.resolve(f === 0));
    expect(result).toEqual([[], []]);
  });

  it("separates an array into two arrays using an async predicate", async () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const result = await arr.asyncPartition((f: number) => Promise.resolve(f % 2 === 0));
    expect(result).toEqual([
      [2, 4, 6],
      [1, 3, 5],
    ]);
  });

  it("returns the partition mapped by the value callback", async () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const result = await arr.asyncPartition(
      (f: number) => Promise.resolve(f % 2 === 0),
      (v) => Promise.resolve(v * 2),
    );
    expect(result).toEqual([
      [4, 8, 12],
      [2, 6, 10],
    ]);
  });
});
