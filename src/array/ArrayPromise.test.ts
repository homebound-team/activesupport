import "src/array/array.global";
import { ArrayPromise } from "src/array/ArrayPromise";
import { asyncMap } from "src/array/asyncMap/asyncMap.impl";

/** Compile-time assertion that `actual` is exactly `Expected`. */
function expectType<Expected>(_actual: Expected): void {}

const delay = <T>(v: T, ms = 1) => new Promise<T>((resolve) => setTimeout(() => resolve(v), ms));

describe("ArrayPromise", () => {
  it("chains async helpers, sync helpers, and built-ins", async () => {
    // given an array of numbers
    const a = [1, 2, 3, 4, 5, 6];
    // when we chain a mix of async/sync helpers and built-ins without intermediate awaits
    const result = await a
      .asyncMap(async (n) => (n === 3 ? undefined : n * 10))
      .compact()
      .asyncFilter(async (n) => delay(n > 10))
      .map((n) => n + 1)
      .sortBy((n) => -n);
    // then each step is applied in order
    expect(result).toEqual([61, 51, 41, 21]);
    expectType<number[]>(result);
  });

  it("is a real Promise", async () => {
    // given an ArrayPromise from asyncMap
    const p = [1, 2].asyncMap(async (n) => n);
    // then it is an instance of both Promise and ArrayPromise, and assignable to Promise<T[]>
    expect(p).toBeInstanceOf(Promise);
    expect(p).toBeInstanceOf(ArrayPromise);
    const asPromise: Promise<number[]> = p;
    expect(await asPromise).toEqual([1, 2]);
  });

  it("returns plain Promises from then/catch/finally", async () => {
    // given an ArrayPromise
    const p = [1, 2].asyncMap(async (n) => n);
    // when we call then
    const then = p.then((arr) => arr.length);
    // then the result is a plain Promise, since its value is no longer an array
    expect(then).toBeInstanceOf(Promise);
    expect(then).not.toBeInstanceOf(ArrayPromise);
    expect(await then).toBe(2);
    expect(p.catch(() => [])).not.toBeInstanceOf(ArrayPromise);
    expect(p.finally(() => {})).not.toBeInstanceOf(ArrayPromise);
  });

  it("ends the chain with terminal methods", async () => {
    // given an ArrayPromise of objects
    const p = [{ n: 1 }, { n: 2 }, { n: 3 }].asyncMap(async (o) => o);
    // when we call methods that do not return arrays, then they return plain promises of the value
    const sum = p.sum((o) => o.n);
    expect(sum).not.toBeInstanceOf(ArrayPromise);
    expect(await sum).toBe(6);
    expectType<Promise<number>>(sum);
    expect(await p.sum(async (o) => o.n)).toBe(6);
    expect(await p.map((o) => o.n).sum()).toBe(6);
    expect(await p.map((o) => BigInt(o.n)).sum()).toBe(6n);
    expect(await p.max((o) => o.n)).toBe(3);
    expect(await p.map((o) => o.n).min()).toBe(1);
    expect(await p.count((o) => o.n > 1)).toBe(2);
    expect(await p.count(async (o) => o.n > 1)).toBe(2);
    expect(await p.groupBy((o) => (o.n % 2 ? "odd" : "even"))).toEqual({ odd: [{ n: 1 }, { n: 3 }], even: [{ n: 2 }] });
    expect(
      await p.partition(
        (o) => o.n > 1,
        (o) => o.n,
      ),
    ).toEqual([[2, 3], [1]]);
    expect(await p.asyncPartition(async (o) => o.n > 1)).toEqual([[{ n: 2 }, { n: 3 }], [{ n: 1 }]]);
    expect(await p.asyncSome(async (o) => o.n === 2)).toBe(true);
    expect(await p.find((o) => o.n === 2)).toEqual({ n: 2 });
    expect(await p.map((o) => o.n).join("-")).toBe("1-2-3");
    expect(await p.map((o) => o.n).reduce((acc, n) => acc + n, 10)).toBe(16);
  });

  it("supports getters", async () => {
    // given an ArrayPromise
    const p = [1, 2, 3].asyncMap(async (n) => n);
    // then getters resolve to the underlying values
    expect(await p.first).toBe(1);
    expect(await p.last).toBe(3);
    expect(await p.length).toBe(3);
    expect(await p.isEmpty).toBe(false);
    expect(await p.filter(() => false).isEmpty).toBe(true);
    expect(await p.nonEmpty).toBe(true);
  });

  it("supports forEach and asyncForEach at the end of a chain", async () => {
    // given an ArrayPromise
    const seen: number[] = [];
    // when we end the chain with forEach / asyncForEach
    await [1, 2].asyncMap(async (n) => n).forEach((n) => seen.push(n));
    await [3, 4].asyncMap(async (n) => n).asyncForEach(async (n) => seen.push(n));
    // then the callbacks ran
    expect(seen).toEqual([1, 2, 3, 4]);
  });

  it("narrows with type-guard filters", async () => {
    // given an ArrayPromise of mixed types
    const p = [1, "a", 2].asyncMap(async (v) => v);
    // when we filter with a type guard
    const nums = await p.filter((v): v is number => typeof v === "number");
    // then the element type narrows
    expectType<number[]>(nums);
    expect(nums).toEqual([1, 2]);
  });

  it("propagates rejections through the chain", async () => {
    // given a chain whose first step rejects
    const later = jest.fn();
    const p = [1, 2]
      .asyncMap(async () => {
        throw new Error("boom");
      })
      .map(later)
      .compact();
    // then the final promise rejects, and later steps never run
    await expect(p).rejects.toThrow("boom");
    expect(later).not.toHaveBeenCalled();
  });

  it("turns a synchronously-throwing callback into a rejection", async () => {
    // given a callback that throws before returning a promise
    const p = asyncMap([1], (): Promise<number> => {
      throw new Error("sync boom");
    });
    // then asyncMap still returns a rejected ArrayPromise rather than throwing
    expect(p).toBeInstanceOf(ArrayPromise);
    await expect(p).rejects.toThrow("sync boom");
  });

  it("is returned by the functional API too", async () => {
    // given the non-global asyncMap
    const result = await asyncMap([1, 2, 3], async (n) => n).without(2);
    // then it is chainable
    expect(result).toEqual([1, 3]);
  });

  it("rejects helpers whose element type doesn't fit", () => {
    const p = ArrayPromise.from(["a", "b"]);
    // @ts-expect-error sum() without a callback requires numbers or bigints
    void p.sum().catch(() => {});
    const objects = ArrayPromise.from([{}]);
    // @ts-expect-error max() without a callback requires Comparable elements
    void objects.max().catch(() => {});
  });

  describe("from", () => {
    it("wraps arrays and promises of arrays", async () => {
      expect(await ArrayPromise.from([3, 1, 2]).toSorted()).toEqual([1, 2, 3]);
      expect(await ArrayPromise.from(Promise.resolve([1, 1, 2])).unique()).toEqual([1, 2]);
    });

    it("returns ArrayPromises as-is", () => {
      const p = ArrayPromise.from([1]);
      expect(ArrayPromise.from(p)).toBe(p);
    });
  });
});
