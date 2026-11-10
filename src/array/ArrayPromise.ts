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
import { each } from "src/array/each/each.impl";
import { everyHasSame } from "src/array/everyHasSame/everyHasSame.impl";
import { findAfter } from "src/array/findAfter/findAfter.impl";
import { findBefore } from "src/array/findBefore/findBefore.impl";
import { findFirst } from "src/array/findFirst/findFirst.impl";
import { first } from "src/array/first/first.impl";
import { groupBy } from "src/array/groupBy/groupBy.impl";
import { groupByObject } from "src/array/groupByObject/groupByObject.impl";
import { hasSameElements } from "src/array/hasSameElements/hasSameElements.impl";
import { indexBy } from "src/array/indexBy/indexBy.impl";
import { intersection } from "src/array/intersection/intersection.impl";
import { isEmpty } from "src/array/isEmpty/isEmpty.impl";
import { keyBy } from "src/array/keyBy/keyBy.impl";
import { keyByObject } from "src/array/keyByObject/keyByObject.impl";
import { last } from "src/array/last/last.impl";
import { mapToObject } from "src/array/mapToObject/mapToObject.impl";
import { max } from "src/array/max/max.impl";
import { maxBy } from "src/array/maxBy/maxBy.impl";
import { maybeSum } from "src/array/maybeSum/maybeSum.impl";
import { min } from "src/array/min/min.impl";
import { minBy } from "src/array/minBy/minBy.impl";
import { nonEmpty } from "src/array/nonEmpty/nonEmpty.impl";
import { notSameElements } from "src/array/notSameElements/notSameElements.impl";
import { partition } from "src/array/partition/partition.impl";
import { sentenceJoin } from "src/array/sentenceJoin/sentenceJoin.impl";
import { sortBy } from "src/array/sortBy/sortBy.impl";
import { sortByKey } from "src/array/sortByKey/sortByKey.impl";
import { sum } from "src/array/sum/sum.impl";
import { toObject } from "src/array/toObject/toObject.impl";
import { unique } from "src/array/unique/unique.impl";
import { uniqueBy } from "src/array/uniqueBy/uniqueBy.impl";
import { uniqueByKey } from "src/array/uniqueByKey/uniqueByKey.impl";
import { CallbackFn } from "src/array/utils";
import { without } from "src/array/without/without.impl";
import { withoutAll } from "src/array/withoutAll/withoutAll.impl";
import { xor } from "src/array/xor/xor.impl";
import { Comparable, KeysOfType, MaybePromise } from "src/utils";

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

  // ─── Library helpers ───────────────────────────────────────────────────────
  // Everything between the markers is generated from the `*.impl.ts` files by `yarn generate:globals`. Edit the
  // impls (or `scripts/generate-globals.ts`) instead of this section.

  // BEGIN GENERATED HELPERS
  /**
   * Filters an array using an async callback, waiting for all callbacks to resolve.
   * @param fn An async function to test each element
   * @returns A promise resolving to an array of elements that passed the callback
   */
  asyncFilter(fn: CallbackFn<T, Promise<boolean>>): ArrayPromise<T>;
  asyncFilter(...args: any[]): any {
    return this.#chain((a) => (asyncFilter as any)(a, ...args));
  }

  /**
   * Maps each element of an array using an async callback, then flattens the results by one level.
   * Similar to `Promise.all(arr.map(fn)).then(result => result.flat(1))`.
   * @param fn An async function that returns either a single value or an array of values
   * @returns A promise resolving to the flattened array of results
   */
  asyncFlatMap<V>(fn: CallbackFn<T, Promise<V | V[]>>): ArrayPromise<V>;
  asyncFlatMap(...args: any[]): any {
    return this.#chain((a) => (asyncFlatMap as any)(a, ...args));
  }

  /**
   * Executes an async callback for each element in an array, waiting for all to complete.
   * Similar to `Promise.all(arr.map(fn))` but returns void instead of results.
   * @param fn An async function to execute for each element
   * @returns A promise that resolves when all callbacks complete
   */
  asyncForEach(fn: CallbackFn<T, Promise<any>>): Promise<void>;
  asyncForEach(...args: any[]): any {
    return this.#end((a) => (asyncForEach as any)(a, ...args));
  }

  /**
   * Maps each element of an array using an async callback, waiting for all promises to resolve.
   * Equivalent to `Promise.all(arr.map(fn))`.
   * @param fn An async function to transform each element
   * @returns A promise resolving to an array of transformed values
   */
  asyncMap<V>(fn: CallbackFn<T, Promise<V>>): ArrayPromise<V>;
  asyncMap(...args: any[]): any {
    return this.#chain((a) => (asyncMap as any)(a, ...args));
  }

  /**
   * Splits an array into two using an async callback: elements that satisfy it and elements that don't.
   * @param fn An async function to test each element
   * @returns A promise resolving to a tuple of [matches, non-matches]
   */
  asyncPartition(fn: CallbackFn<T, Promise<boolean>>): Promise<[T[], T[]]>;
  /**
   * Splits an array into two using an async callback, transforming elements with valueFn.
   * @param fn An async function to test each element
   * @param valueFn A function to transform each element before adding to result
   * @returns A promise resolving to a tuple of [transformed matches, transformed non-matches]
   */
  asyncPartition<U>(fn: CallbackFn<T, Promise<boolean>>, valueFn: CallbackFn<T, MaybePromise<U>>): Promise<[U[], U[]]>;
  asyncPartition(...args: any[]): any {
    return this.#end((a) => (asyncPartition as any)(a, ...args));
  }

  /**
   * Tests whether at least one element of an array passes an async callback.
   * Returns true as soon as any callback resolves to true, or false if all resolve to false.
   * @param fn An async function to test each element
   * @returns A promise resolving to true if any element passes, false otherwise
   */
  asyncSome(fn: CallbackFn<T, Promise<boolean>>): Promise<boolean>;
  asyncSome(...args: any[]): any {
    return this.#end((a) => (asyncSome as any)(a, ...args));
  }

  /**
   * Splits an array into chunks of a specified size.
   * The final chunk may contain fewer elements if the array length is not evenly divisible.
   * @param n The size of each batch
   * @returns An array of arrays, each containing up to n elements
   */
  batched(n: number): ArrayPromise<T[]>;
  batched(...args: any[]): any {
    return this.#chain((a) => (batched as any)(a, ...args));
  }

  /**
   * Returns a new array with all `null` and `undefined` elements removed.
   * Note that other falsy values (0, false, "") are preserved.
   * @returns A new array with null and undefined values removed
   */
  compact(): ArrayPromise<NonNullable<T>>;
  compact(...args: any[]): any {
    return this.#chain((a) => (compact as any)(a, ...args));
  }

  /**
   * Counts the number of elements in an array that satisfy the callback.
   * @param fn A function to test each element
   * @returns The number of elements for which the callback returns true
   */
  count(fn: CallbackFn<T, boolean>): Promise<number>;
  /**
   * Counts the number of elements in an array that satisfy the async callback.
   * @param fn An async function to test each element
   * @returns A promise resolving to the number of elements for which the callback returns true
   */
  count(fn: CallbackFn<T, Promise<boolean>>): Promise<number>;
  count(...args: any[]): any {
    return this.#end((a) => (count as any)(a, ...args));
  }

  /**
   * Returns a new array containing elements that are present in the first array but not in the second.
   * @param other The array of elements to exclude
   * @returns A new array containing elements that exist only in the first array
   */
  difference(other: T[]): ArrayPromise<T>;
  difference(...args: any[]): any {
    return this.#chain((a) => (difference as any)(a, ...args));
  }

  /**
   * Executes a function for each element and returns the original array for chaining.
   * Use this instead of `forEach` when you need to continue a method chain.
   * @param fn A function to execute for each element
   * @returns The original array
   */
  each(fn: CallbackFn<T>): ArrayPromise<T>;
  each(...args: any[]): any {
    return this.#chain((a) => (each as any)(a, ...args));
  }

  /**
   * Returns true if all elements of an array produce the same value when passed through the callback.
   * @param fn A function that extracts a value to compare from each element
   * @returns True if all elements produce the same value
   */
  everyHasSame(fn: CallbackFn<T, unknown>): Promise<boolean>;
  everyHasSame(...args: any[]): any {
    return this.#end((a) => (everyHasSame as any)(a, ...args));
  }

  /**
   * Returns the element that comes immediately after the specified element in an array.
   * @param el The element to find the successor of
   * @returns The element after the specified element, or undefined if el is last, not found, or the array is empty
   */
  findAfter(el: T): Promise<T | undefined>;
  findAfter(...args: any[]): any {
    return this.#end((a) => (findAfter as any)(a, ...args));
  }

  /**
   * Returns the element that comes immediately before the specified element in an array.
   * @param el The element to find the predecessor of
   * @returns The element before the specified element, or undefined if el is first, not found, or the array is empty
   */
  findBefore(el: T): Promise<T | undefined>;
  findBefore(...args: any[]): any {
    return this.#end((a) => (findBefore as any)(a, ...args));
  }

  /**
   * Iterates through an array and returns the first defined result from the callback function.
   * Stops iteration as soon as a defined value is found.
   * @param fn A function that returns a value or undefined for each element
   * @returns The first defined result from the callback, or undefined if none found
   */
  findFirst<U>(fn: CallbackFn<T, U | undefined>): Promise<U | undefined>;
  findFirst(...args: any[]): any {
    return this.#end((a) => (findFirst as any)(a, ...args));
  }

  /**
   * Returns the first element of an array, or `undefined` if the array is empty.
   * @returns The first element, or undefined if the array is empty
   */
  get first(): Promise<T | undefined> {
    return this.#end((a) => first(a));
  }

  /**
   * Groups elements of an array into a record by a key extracted from each element.
   * Optionally transforms values using a value function.
   * @param fn A function that returns the grouping key for each element
   * @param valueFn Optional function to transform each element before grouping
   * @returns A record mapping keys to arrays of grouped values
   */
  groupBy<K extends PropertyKey>(fn: CallbackFn<T, K>): Promise<Record<K, T[]>>;
  /**
   * Groups elements of an array into a record by a key extracted from each element.
   * Optionally transforms values using a value function.
   * @param fn A function that returns the grouping key for each element
   * @param valueFn Optional function to transform each element before grouping
   * @returns A record mapping keys to arrays of grouped values
   */
  groupBy<K extends PropertyKey, R>(fn: CallbackFn<T, K>, valueFn: CallbackFn<T, R>): Promise<Record<K, R[]>>;
  groupBy(...args: any[]): any {
    return this.#end((a) => (groupBy as any)(a, ...args));
  }

  /**
   * Groups elements of an array by any object key (not limited to property keys like strings/numbers).
   * Returns an array of [key, values] tuples. Use this when grouping by objects or complex keys.
   * @param fn A function that returns the grouping key (can be any object) for each element
   * @param valueFn Optional function to transform each element before grouping
   * @returns An array of [key, values[]] tuples
   */
  groupByObject<O, Y = T>(fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, Y>): ArrayPromise<[O, Y[]]>;
  groupByObject(...args: any[]): any {
    return this.#chain((a) => (groupByObject as any)(a, ...args));
  }

  /**
   * Returns true if two arrays have exactly the same elements (ignoring order).
   * Treats duplicates strictly - arrays must have the same element counts to be considered equal.
   * @param other The second array to compare
   * @returns True if the arrays have the same elements
   */
  hasSameElements(other: readonly T[]): Promise<boolean>;
  hasSameElements(...args: any[]): any {
    return this.#end((a) => (hasSameElements as any)(a, ...args));
  }

  /**
   * Creates a Map index from an array where each element can be associated with multiple keys.
   * Unlike `groupBy`, elements can appear under multiple keys (e.g., tags, categories).
   * @param fn A function that returns an array of keys for each element
   * @param valueFn Optional function to transform each element before indexing
   * @returns A Map where each key maps to an array of matching values
   */
  indexBy<O, Y = T>(fn: CallbackFn<T, O[]>, valueFn?: CallbackFn<T, Y>): Promise<Map<O, Y[]>>;
  indexBy(...args: any[]): any {
    return this.#end((a) => (indexBy as any)(a, ...args));
  }

  /**
   * Returns a new array containing elements present in both arrays.
   * @param other The second array to compare against
   * @returns An array containing elements present in both arrays
   */
  intersection(other: readonly T[]): ArrayPromise<T>;
  intersection(...args: any[]): any {
    return this.#chain((a) => (intersection as any)(a, ...args));
  }

  /**
   * Returns true if an array contains no elements.
   * @returns True if the array is empty
   */
  get isEmpty(): Promise<boolean> {
    return this.#end((a) => isEmpty(a));
  }

  /**
   * Creates a record from an array, indexed by a field value from each element.
   * Throws an error if duplicate keys are found for different elements. Use `groupBy` to allow duplicates.
   * @param field The field name to use as the key
   * @returns A record mapping field values to elements
   */
  keyBy<K extends KeysOfType<T, PropertyKey>, TK extends PropertyKey = T[K] & PropertyKey>(
    field: K,
  ): Promise<Record<TK, T>>;
  /**
   * Creates a record from an array, indexed by a key extracted from each element.
   * Throws an error if duplicate keys are found for different elements. Use `groupBy` to allow duplicates.
   * @param fn A function that returns the key for each element
   * @param valueFn Optional function to transform each element before storing
   * @returns A record mapping keys to values
   */
  keyBy<K extends PropertyKey, TK extends keyof T, R = T>(
    fn: CallbackFn<T, K>,
    valueFn?: CallbackFn<T, R>,
  ): Promise<Record<K, R>>;
  keyBy(...args: any[]): any {
    return this.#end((a) => (keyBy as any)(a, ...args));
  }

  /**
   * Creates a Map from an array, indexed by any object key (not limited to property keys).
   * Throws an error if duplicate keys are found for different elements.
   * Useful when keys are objects or complex types.
   * @param fn A function that returns the key (can be any object) for each element
   * @param valueFn Optional function to transform each element before storing
   * @returns A Map from keys to values
   */
  keyByObject<O, R = T>(fn: CallbackFn<T, O>, valueFn?: CallbackFn<T, R>): Promise<Map<O, R>>;
  keyByObject(...args: any[]): any {
    return this.#end((a) => (keyByObject as any)(a, ...args));
  }

  /**
   * Returns the last element of an array, or `undefined` if the array is empty.
   * @returns The last element, or undefined if the array is empty
   */
  get last(): Promise<T | undefined> {
    return this.#end((a) => last(a));
  }

  /**
   * Maps each element of an array to a key-value pair, then converts the result to an object.
   * Similar to `Object.fromEntries(arr.map(fn))`.
   * @param fn A function that returns a [key, value] tuple for each element
   * @returns An object constructed from the key-value pairs
   */
  mapToObject<K extends PropertyKey, V>(fn: CallbackFn<T, readonly [K, V]>): Promise<Record<K, V>>;
  /**
   * Maps each element of an array to a key-value pair using an async callback, then converts the result to an object.
   * @param fn An async function that returns a [key, value] tuple for each element
   * @returns A promise resolving to an object constructed from the key-value pairs
   */
  mapToObject<K extends PropertyKey, V>(fn: CallbackFn<T, Promise<readonly [K, V]>>): Promise<Record<K, V>>;
  mapToObject(...args: any[]): any {
    return this.#end((a) => (mapToObject as any)(a, ...args));
  }

  /**
   * Returns the maximum value from an array of comparable elements (numbers, strings, dates, etc.).
   * @returns The largest element in the array
   */
  max(this: ArrayPromise<T & Comparable>): Promise<T>;
  /**
   * Returns the maximum value after transforming each element of an array with a callback.
   * @param fn A function that returns a comparable value for each element
   * @returns The largest value returned by the callback
   */
  max<R extends Comparable>(fn: CallbackFn<T, R>): Promise<R>;
  max(...args: any[]): any {
    return this.#end((a) => (max as any)(a, ...args));
  }

  /**
   * Returns the element from an array with the maximum value as determined by the callback function.
   * @param fn A function that returns a comparable value for each element
   * @returns The element with the largest value
   */
  maxBy<R extends Comparable>(fn: CallbackFn<T, R>): Promise<T>;
  maxBy(...args: any[]): any {
    return this.#end((a) => (maxBy as any)(a, ...args));
  }

  /**
   * Sums numbers in an array but returns `undefined` if the array is empty or contains only `null`/`undefined` values.
   * This helps distinguish between "sum is zero" vs "no values to sum".
   * @returns The sum of all numbers, or undefined if there are no defined values
   */
  maybeSum(this: ArrayPromise<number | undefined>): Promise<number | undefined>;
  /**
   * Sums all bigints in an array, returning `undefined` if empty or all values are `undefined`.
   * @returns The sum of all bigints, or undefined if there are no defined values
   */
  maybeSum(this: ArrayPromise<bigint | undefined>): Promise<bigint | undefined>;
  /**
   * Sums values extracted by a callback from an array, returning `undefined` if empty or all values are `undefined`.
   * @param fn A function that returns a number for each element
   * @returns The sum of all returned numbers, or undefined if there are no defined values
   */
  maybeSum(fn: CallbackFn<T, number | undefined>): Promise<number | undefined>;
  /**
   * Sums bigint values extracted by a callback from an array, returning `undefined` if empty or all values are `undefined`.
   * @param fn A function that returns a bigint for each element
   * @returns The sum of all returned bigints, or undefined if there are no defined values
   */
  maybeSum(fn: CallbackFn<T, bigint | undefined>): Promise<bigint | undefined>;
  /**
   * Sums values extracted by an async callback from an array, returning `undefined` if empty or all values are `undefined`.
   * @param fn An async function that returns a number for each element
   * @returns A promise resolving to the sum, or undefined if there are no defined values
   */
  maybeSum(fn: CallbackFn<T, Promise<number | undefined>>): Promise<number | undefined>;
  /**
   * Sums bigint values extracted by an async callback from an array, returning `undefined` if empty or all values are `undefined`.
   * @param fn An async function that returns a bigint for each element
   * @returns A promise resolving to the sum, or undefined if there are no defined values
   */
  maybeSum(fn: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
  maybeSum(...args: any[]): any {
    return this.#end((a) => (maybeSum as any)(a, ...args));
  }

  /**
   * Returns the minimum value from an array of comparable elements (numbers, strings, dates, etc.).
   * @returns The smallest element in the array
   */
  min(this: ArrayPromise<T & Comparable>): Promise<T>;
  /**
   * Returns the minimum value after transforming each element of an array with a callback.
   * @param fn A function that returns a comparable value for each element
   * @returns The smallest value returned by the callback
   */
  min<R extends Comparable>(fn: CallbackFn<T, R>): Promise<R>;
  min(...args: any[]): any {
    return this.#end((a) => (min as any)(a, ...args));
  }

  /**
   * Returns the element from an array with the minimum value as determined by the callback function.
   * @param fn A function that returns a comparable value for each element
   * @returns The element with the smallest value
   */
  minBy<R extends Comparable>(fn: CallbackFn<T, R>): Promise<T>;
  minBy(...args: any[]): any {
    return this.#end((a) => (minBy as any)(a, ...args));
  }

  /**
   * Returns true if an array contains at least one element.
   * @returns True if the array has one or more elements
   */
  get nonEmpty(): Promise<boolean> {
    return this.#end((a) => nonEmpty(a));
  }

  /**
   * Returns true if two arrays have different elements (ignoring order).
   * Treats duplicates strictly - arrays with different duplicate counts are considered different.
   * @param other The second array to compare
   * @returns True if the arrays have different elements
   */
  notSameElements(other: readonly T[]): Promise<boolean>;
  notSameElements(...args: any[]): any {
    return this.#end((a) => (notSameElements as any)(a, ...args));
  }

  /**
   * Splits an array into two: elements that satisfy the callback and elements that don't.
   * @param fn A function to test each element
   * @returns A tuple of [matches, non-matches]
   */
  partition(fn: CallbackFn<T, boolean>): Promise<[T[], T[]]>;
  /**
   * Splits an array into two after transforming elements with valueFn.
   * @param fn A function to test each element
   * @param valueFn A function to transform each element before adding to result
   * @returns A tuple of [transformed matches, transformed non-matches]
   */
  partition<U>(fn: CallbackFn<T, boolean>, valueFn: CallbackFn<T, U>): Promise<[U[], U[]]>;
  partition(...args: any[]): any {
    return this.#end((a) => (partition as any)(a, ...args));
  }

  /**
   * Joins array elements into a grammatically correct sentence with commas and a conjunction.
   * @param opts Optional settings for the conjunction word and separator
   * @returns A string representation of the array as a sentence
   */
  sentenceJoin(opts?: { word?: "and" | "or"; separator?: string }): Promise<string>;
  sentenceJoin(...args: any[]): any {
    return this.#end((a) => (sentenceJoin as any)(a, ...args));
  }

  /**
   * Returns a new array sorted in ascending order based on the value returned by the callback.
   * Supports sorting by multiple criteria by returning an array of values.
   * @param fn A function that returns a comparable value (or array of values) for each element
   * @returns A new sorted array
   */
  sortBy<U extends Comparable>(fn: (el: T) => U | U[]): ArrayPromise<T>;
  sortBy(...args: any[]): any {
    return this.#chain((a) => (sortBy as any)(a, ...args));
  }

  /**
   * Returns a new array sorted in ascending order by a specific object key.
   * @param key The key to sort by
   * @returns A new sorted array
   */
  sortByKey<K extends KeysOfType<T, Comparable>>(key: K): ArrayPromise<T>;
  sortByKey(...args: any[]): any {
    return this.#chain((a) => (sortByKey as any)(a, ...args));
  }

  /**
   * Sums all numbers in an array, treating `undefined` as 0. Returns 0 for empty arrays.
   * @returns The sum of all numbers
   */
  sum(this: ArrayPromise<number | undefined>): Promise<number>;
  /**
   * Sums all bigints in an array, treating `undefined` as 0n. Returns 0n for empty arrays.
   * @returns The sum of all bigints
   */
  sum(this: ArrayPromise<bigint | undefined>): Promise<bigint>;
  /**
   * Sums values extracted by a callback from an array, treating `undefined` as 0. Returns 0 for empty arrays.
   * @param fn A function that returns a number for each element
   * @returns The sum of all returned numbers
   */
  sum(fn: CallbackFn<T, number | undefined>): Promise<number>;
  /**
   * Sums bigint values extracted by a callback from an array, treating `undefined` as 0n.
   * @param fn A function that returns a bigint for each element
   * @returns The sum of all returned bigints
   */
  sum(fn: CallbackFn<T, bigint | undefined>): Promise<bigint>;
  /**
   * Sums values extracted by an async callback from an array, treating `undefined` as 0.
   * @param fn An async function that returns a number for each element
   * @returns A promise resolving to the sum of all returned numbers
   */
  sum(fn: CallbackFn<T, Promise<number | undefined>>): Promise<number>;
  /**
   * Sums bigint values extracted by an async callback from an array, treating `undefined` as 0n.
   * @param fn An async function that returns a bigint for each element
   * @returns A promise resolving to the sum of all returned bigints
   */
  sum(fn: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint>;
  sum(...args: any[]): any {
    return this.#end((a) => (sum as any)(a, ...args));
  }

  /**
   * Converts an array of [key, value] tuples into an object.
   * Equivalent to `Object.fromEntries(arr)`.
   * @returns An object constructed from the key-value pairs
   */
  toObject<K extends PropertyKey, V extends any>(this: ArrayPromise<readonly [K, V]>): Promise<Record<K, V>>;
  toObject(...args: any[]): any {
    return this.#end((a) => (toObject as any)(a, ...args));
  }

  /**
   * Returns a new array with duplicate elements removed.
   * @returns A new array containing only unique elements
   */
  unique(): ArrayPromise<T>;
  unique(...args: any[]): any {
    return this.#chain((a) => (unique as any)(a, ...args));
  }

  /**
   * Returns a new array with duplicates removed based on the value returned by the callback.
   * @param fn A function that returns the value to use for uniqueness comparison
   * @returns A new array containing elements with unique callback values
   */
  uniqueBy(fn: CallbackFn<T, unknown>): ArrayPromise<T>;
  uniqueBy(...args: any[]): any {
    return this.#chain((a) => (uniqueBy as any)(a, ...args));
  }

  /**
   * Returns a new array with duplicates removed based on a specific object key.
   * @param key The key to use for uniqueness comparison
   * @returns A new array containing elements with unique key values
   */
  uniqueByKey<K extends KeysOfType<T, any>>(key: K): ArrayPromise<T>;
  uniqueByKey(...args: any[]): any {
    return this.#chain((a) => (uniqueByKey as any)(a, ...args));
  }

  /**
   * Returns a new array with the specified element(s) removed.
   * This does not mutate the original array. Use `remove` for a mutating version.
   * @param elements The element(s) to exclude from the new array
   * @returns A new array without the specified element(s)
   */
  without(...elements: readonly T[]): ArrayPromise<T>;
  without(...args: any[]): any {
    return this.#chain((a) => (without as any)(a, ...args));
  }

  /**
   * Returns a new array with all specified elements removed.
   * Similar to `without`, but takes an array of elements to remove instead of variadic arguments.
   * @param elements An array of elements to exclude from the new array
   * @returns A new array without the specified elements
   */
  withoutAll(elements: readonly T[]): ArrayPromise<T>;
  withoutAll(...args: any[]): any {
    return this.#chain((a) => (withoutAll as any)(a, ...args));
  }

  /**
   * Returns the symmetric difference: elements that exist in either array but not in both.
   * @param other The second array to compute XOR with
   * @returns An array containing elements present in either array but not in both
   */
  xor(other: readonly T[]): ArrayPromise<T>;
  xor(...args: any[]): any {
    return this.#chain((a) => (xor as any)(a, ...args));
  }

  // END GENERATED HELPERS
}
