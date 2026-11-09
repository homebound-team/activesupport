import { asyncFilter } from "src/array/asyncFilter/asyncFilter.impl";
import { asyncFlatMap } from "src/array/asyncFlatMap/asyncFlatMap.impl";
import { asyncForEach } from "src/array/asyncForEach/asyncForEach.impl";
import { asyncMap } from "src/array/asyncMap/asyncMap.impl";
import { asyncPartition } from "src/array/asyncPartition/asyncPartition.impl";
import { asyncSome } from "src/array/asyncSome/asyncSome.impl";
import { batched } from "src/array/batched/batched.impl";
import { compact } from "src/array/compact/compact.impl";
import { count } from "src/array/count/count.impl";
import { difference } from "src/array/difference/difference.impl";
import { first } from "src/array/first/first.impl";
import { groupBy } from "src/array/groupBy/groupBy.impl";
import { isEmpty } from "src/array/isEmpty/isEmpty.impl";
import { last } from "src/array/last/last.impl";
import { max } from "src/array/max/max.impl";
import { min } from "src/array/min/min.impl";
import { nonEmpty } from "src/array/nonEmpty/nonEmpty.impl";
import { partition } from "src/array/partition/partition.impl";
import { sortBy } from "src/array/sortBy/sortBy.impl";
import { sum } from "src/array/sum/sum.impl";
import { unique } from "src/array/unique/unique.impl";
import { uniqueBy } from "src/array/uniqueBy/uniqueBy.impl";
import { CallbackFn } from "src/array/utils";
import { without } from "src/array/without/without.impl";
import { Comparable, MaybePromise } from "src/utils";

/**
 * A `Promise<T[]>` that exposes array methods (both built-in and this library's helpers), so async array pipelines
 * can be chained without intermediate `await`s.
 *
 * Methods that produce an array return another `ArrayPromise`, so the chain continues. Methods that produce anything
 * else (a number, a boolean, a `Map`, a tuple, `void`, ...) return a plain `Promise` and end the chain.
 *
 * Method names keep their usual sync/async meaning: `.map(fn)` behaves like `Array#map` (if `fn` returns a promise,
 * you get an array of promises), while `.asyncMap(fn)` awaits every callback.
 *
 * Each step waits for the whole previous step to finish (`Promise.all` semantics); elements are not streamed through
 * the pipeline one at a time.
 *
 * `then`/`catch`/`finally` return plain `Promise`s (via `Symbol.species`), since their callbacks can return anything.
 *
 * @example
 * await users
 *   .asyncMap(u => loadProfile(u))
 *   .compact()
 *   .asyncFilter(p => isActive(p))
 *   .sortBy(p => p.name)
 *   .forEach(p => console.log(p.name));
 */
export class ArrayPromise<T> extends Promise<T[]> {
  static get [Symbol.species]() {
    return Promise;
  }

  /**
   * Wraps an array, or a promise of an array, in an `ArrayPromise`. Returns `value` as-is if it's already one.
   * @example await ArrayPromise.from(fetchIds()).asyncMap(loadUser)
   */
  static from<T>(value: T[] | readonly T[] | PromiseLike<T[] | readonly T[]>): ArrayPromise<T> {
    if (value instanceof ArrayPromise) return value;
    return new ArrayPromise<T>((resolve) => resolve(value as T[] | PromiseLike<T[]>));
  }

  /** Applies `fn` to the resolved array, continuing the chain. */
  #chain<V>(fn: (arr: T[]) => V[] | PromiseLike<V[]>): ArrayPromise<V> {
    return ArrayPromise.from(this.then(fn));
  }

  /** Applies `fn` to the resolved array, ending the chain. */
  #end<R>(fn: (arr: T[]) => R | PromiseLike<R>): Promise<Awaited<R>> {
    return this.then(fn) as Promise<Awaited<R>>;
  }

  // ─── Built-in array methods: chaining ──────────────────────────────────────

  map<V>(fn: CallbackFn<T, V>): ArrayPromise<V> {
    return this.#chain((a) => a.map(fn));
  }

  filter<S extends T>(fn: (element: T, index: number, array: T[]) => element is S): ArrayPromise<S>;
  filter(fn: CallbackFn<T, unknown>): ArrayPromise<T>;
  filter(fn: CallbackFn<T, unknown>): ArrayPromise<T> {
    return this.#chain((a) => a.filter(fn));
  }

  flatMap<V>(fn: CallbackFn<T, V | readonly V[]>): ArrayPromise<V> {
    return this.#chain((a) => a.flatMap(fn));
  }

  slice(start?: number, end?: number): ArrayPromise<T> {
    return this.#chain((a) => a.slice(start, end));
  }

  concat(...items: (T | ConcatArray<T>)[]): ArrayPromise<T> {
    return this.#chain((a) => a.concat(...items));
  }

  toSorted(compareFn?: (a: T, b: T) => number): ArrayPromise<T> {
    return this.#chain((a) => a.toSorted(compareFn));
  }

  toReversed(): ArrayPromise<T> {
    return this.#chain((a) => a.toReversed());
  }

  // ─── Built-in array methods: terminal ──────────────────────────────────────

  get length(): Promise<number> {
    return this.#end((a) => a.length);
  }

  forEach(fn: CallbackFn<T, void>): Promise<void> {
    return this.#end((a) => a.forEach(fn));
  }

  find<S extends T>(fn: (element: T, index: number, array: T[]) => element is S): Promise<S | undefined>;
  find(fn: CallbackFn<T, unknown>): Promise<T | undefined>;
  find(fn: CallbackFn<T, unknown>): Promise<T | undefined> {
    return this.#end((a) => a.find(fn));
  }

  findIndex(fn: CallbackFn<T, unknown>): Promise<number> {
    return this.#end((a) => a.findIndex(fn));
  }

  some(fn: CallbackFn<T, unknown>): Promise<boolean> {
    return this.#end((a) => a.some(fn));
  }

  every(fn: CallbackFn<T, unknown>): Promise<boolean> {
    return this.#end((a) => a.every(fn));
  }

  includes(value: T, fromIndex?: number): Promise<boolean> {
    return this.#end((a) => a.includes(value, fromIndex));
  }

  at(index: number): Promise<T | undefined> {
    return this.#end((a) => a.at(index));
  }

  join(separator?: string): Promise<string> {
    return this.#end((a) => a.join(separator));
  }

  reduce(fn: (acc: T, el: T, index: number, array: T[]) => T): Promise<T>;
  reduce<U>(fn: (acc: U, el: T, index: number, array: T[]) => U, initial: U): Promise<U>;
  reduce(fn: (acc: any, el: T, index: number, array: T[]) => any, ...initial: [any?]): Promise<any> {
    return this.#end((a) => (a.reduce as any)(fn, ...initial));
  }

  // ─── Library helpers: chaining ─────────────────────────────────────────────

  /** See {@link asyncMap}. */
  asyncMap<V>(fn: CallbackFn<T, Promise<V>>): ArrayPromise<V> {
    return this.#chain((a) => asyncMap(a, fn));
  }

  /** See {@link asyncFilter}. */
  asyncFilter(fn: CallbackFn<T, Promise<boolean>>): ArrayPromise<T> {
    return this.#chain((a) => asyncFilter(a, fn));
  }

  /** See {@link asyncFlatMap}. */
  asyncFlatMap<V>(fn: CallbackFn<T, Promise<V | V[]>>): ArrayPromise<V> {
    return this.#chain((a) => asyncFlatMap(a, fn));
  }

  /** See {@link compact}. */
  compact(): ArrayPromise<NonNullable<T>> {
    return this.#chain((a) => compact(a));
  }

  /** See {@link unique}. */
  unique(): ArrayPromise<T> {
    return this.#chain((a) => unique(a));
  }

  /** See {@link uniqueBy}. */
  uniqueBy(fn: CallbackFn<T, unknown>): ArrayPromise<T> {
    return this.#chain((a) => uniqueBy(a, fn));
  }

  /** See {@link sortBy}. */
  sortBy<U extends Comparable>(fn: (el: T) => U | U[]): ArrayPromise<T> {
    return this.#chain((a) => sortBy(a, fn));
  }

  /** See {@link without}. */
  without(...elements: readonly T[]): ArrayPromise<T> {
    return this.#chain((a) => without(a, ...elements));
  }

  /** See {@link difference}. */
  difference(other: T[]): ArrayPromise<T> {
    return this.#chain((a) => difference(a, other));
  }

  /** See {@link batched}. */
  batched(n: number): ArrayPromise<T[]> {
    return this.#chain((a) => batched(a, n));
  }

  // ─── Library helpers: terminal ─────────────────────────────────────────────

  /** See {@link first}. */
  get first(): Promise<T | undefined> {
    return this.#end((a) => first(a));
  }

  /** See {@link last}. */
  get last(): Promise<T | undefined> {
    return this.#end((a) => last(a));
  }

  /** See {@link isEmpty}. */
  get isEmpty(): Promise<boolean> {
    return this.#end((a) => isEmpty(a));
  }

  /** See {@link nonEmpty}. */
  get nonEmpty(): Promise<boolean> {
    return this.#end((a) => nonEmpty(a));
  }

  /** See {@link asyncForEach}. */
  asyncForEach(fn: CallbackFn<T, Promise<any>>): Promise<void> {
    return this.#end((a) => asyncForEach(a, fn));
  }

  /** See {@link asyncSome}. */
  asyncSome(fn: CallbackFn<T, Promise<boolean>>): Promise<boolean> {
    return this.#end((a) => asyncSome(a, fn));
  }

  /** See {@link asyncPartition}. */
  asyncPartition(fn: CallbackFn<T, Promise<boolean>>): Promise<[T[], T[]]>;
  asyncPartition<U>(fn: CallbackFn<T, Promise<boolean>>, valueFn: CallbackFn<T, MaybePromise<U>>): Promise<[U[], U[]]>;
  asyncPartition(fn: CallbackFn<T, Promise<boolean>>, valueFn?: CallbackFn<T, any>): Promise<[any[], any[]]> {
    return this.#end((a) => asyncPartition(a, fn, valueFn as CallbackFn<T, any>));
  }

  /** See {@link partition}. */
  partition(fn: CallbackFn<T, boolean>): Promise<[T[], T[]]>;
  partition<U>(fn: CallbackFn<T, boolean>, valueFn: CallbackFn<T, U>): Promise<[U[], U[]]>;
  partition(fn: CallbackFn<T, boolean>, valueFn?: CallbackFn<T, any>): Promise<[any[], any[]]> {
    return this.#end((a) => partition(a, fn, valueFn as CallbackFn<T, any>));
  }

  /** See {@link groupBy}. */
  groupBy<K extends PropertyKey>(fn: CallbackFn<T, K>): Promise<Record<K, T[]>>;
  groupBy<K extends PropertyKey, R>(fn: CallbackFn<T, K>, valueFn: CallbackFn<T, R>): Promise<Record<K, R[]>>;
  groupBy(fn: CallbackFn<T, PropertyKey>, valueFn?: CallbackFn<T, any>): Promise<Record<PropertyKey, any[]>> {
    return this.#end((a) => groupBy(a, fn, valueFn as CallbackFn<T, any>));
  }

  /**
   * See {@link count}. Unlike `Array#count`, sync and async callbacks both yield a `Promise<number>`, so they share
   * one signature.
   */
  count(fn: CallbackFn<T, MaybePromise<boolean>>): Promise<number> {
    return this.#end((a) => count(a, fn as CallbackFn<T, boolean>));
  }

  /** See {@link sum}. */
  sum(this: ArrayPromise<number | undefined>): Promise<number>;
  sum(this: ArrayPromise<bigint | undefined>): Promise<bigint>;
  sum(fn: CallbackFn<T, MaybePromise<number | undefined>>): Promise<number>;
  sum(fn: CallbackFn<T, MaybePromise<bigint | undefined>>): Promise<bigint>;
  sum(fn?: CallbackFn<T, MaybePromise<number | bigint | undefined>>): Promise<number | bigint> {
    return this.#end((a) => (sum as any)(a, fn));
  }

  /** See {@link max}. */
  max(this: ArrayPromise<T & Comparable>): Promise<T>;
  max<R extends Comparable>(fn: CallbackFn<T, R>): Promise<R>;
  max(fn?: CallbackFn<T, Comparable>): Promise<any> {
    return this.#end((a) => (max as any)(a, fn));
  }

  /** See {@link min}. */
  min(this: ArrayPromise<T & Comparable>): Promise<T>;
  min<R extends Comparable>(fn: CallbackFn<T, R>): Promise<R>;
  min(fn?: CallbackFn<T, Comparable>): Promise<any> {
    return this.#end((a) => (min as any)(a, fn));
  }
}
