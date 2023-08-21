import type { KeysOfType } from "./utils";

declare global {
  interface Array<T> {
    unique(): Array<T>;
    uniqueByKey(key: keyof T): Array<T>;
    compact(): Array<NonNullable<T>>;
    isEmpty: boolean;
    nonEmpty: boolean;
    first: T | undefined;
    last: T | undefined;
    remove(element: T): void;
    /** Array is returned in ascending order. */
    sortBy<K extends Sortable>(f: (el: T) => K): T[];
    /** Array is returned in ascending order. */
    sortByKey<K extends KeysOfType<T, Sortable>>(key: K): T[];
    /**
     * Splits `array` into two: one array with elements that satisfy `f`, and one with elements that do not.
     *
     * partition(["foo1", "bar", "foo2"], (s: string) => s.startsWith("foo"))
     * => [["foo1", "foo2"], ["bar"]]
     */
    partition(f: (el: T) => boolean): [T[], T[]];
    /**
     * Chainable substitution for `forEach`. Only use if actually beneficial.
     * Be careful with side effects if you actually use this in the middle
     * of a chain.
     */
    each(f: (el: T, index: number, array: T[]) => any): T[];
    /** Helper for filtering arrays on async predicates. */
    asyncFilter(predicate: (v: T) => Promise<boolean>): Promise<Array<T>>;
    asyncMap<V>(f: (el: T, index: number, array: T[]) => Promise<V>): Promise<V[]>;
    asyncForEach(f: (el: T, index: number, array: T[]) => Promise<any>): Promise<void>;
    sum(this: Array<number | undefined>): number;
    sum(f: (el: T, index: number, array: T[]) => number | undefined): number;
    sum(f: (el: T, index: number, array: T[]) => Promise<number | undefined>): Promise<number>;
    /**
     * Sums numbers but will return `undefined` if either a) there are no numbers or b) they are all
     * `null` or `undefined`.
     *
     * This is to mitigate the "tables of meaningless zeros" that our team experienced in CoConstruct,
     * i.e. not being able to tell "is this zero b/c someone typed zero in?" vs. "is this zero b/c it
     * just doesn't have a value yet"?
     */
    sumOrUndefined(this: Array<number | undefined>): number | undefined;
    sumOrUndefined(f: (el: T, index: number, array: T[]) => number | undefined): number | undefined;
    sumOrUndefined(f: (el: T, index: number, array: T[]) => Promise<number | undefined>): Promise<number | undefined>;
    groupBy<K extends PropertyKey, Y = T>(this: T[], fn: (x: T) => K, valueFn?: (x: T) => Y): Record<K, Y[]>;
    groupByObject<O, Y = T>(this: T[], fn: (x: T) => O, valueFn?: (x: T) => Y): Array<[O, Y[]]>;
    keyBy<K extends keyof T>(this: T[], field: T[K] extends PropertyKey ? T[K] : never): Record<PropertyKey, T>;
    keyBy<K extends PropertyKey, Y = T>(this: T[], fn: (x: T) => K, valueFn?: (x: T) => Y): Record<K, Y>;
    keyByObject<O, Y = T>(this: T[], fn: (x: T) => O, valueFn?: (x: T) => Y): Map<O, Y>;
    batched(n: number): T[][];
    findBefore(el: T): T | undefined;
    findAfter(el: T): T | undefined;
    findAndRemove: (predicate: (value: T, index: number, obj: T[]) => boolean) => T | undefined;
    sentenceJoin(opts?: { word?: "and" | "or"; separator?: string }): string;
    toObject<K extends PropertyKey, T>(this: Array<readonly [K, T]>): Record<K, T>;
    mapToObject<K extends PropertyKey, T, U>(
      this: Array<T>,
      f: (el: T, index: number, array: Array<T>) => [K, U],
    ): Record<K, U>;
    max(this: number[] | Date[]): T;
    max<R extends number | Date>(this: T[], f: (el: T, index: number, array: Array<T>) => R): R;
    min(this: number[] | Date[]): T;
    min<R extends number | Date>(this: Array<T>, f: (el: T, index: number, array: Array<T>) => R): R;
    count(f: (el: T, index: number, array: T[]) => boolean): number;
    unanimous(f: (el: T) => unknown): boolean;
  }

  interface ReadonlyArray<T> {
    compact(): Array<NonNullable<T>>;
    isEmpty: boolean;
    nonEmpty: boolean;
    first: T | undefined;
    last: T | undefined;
    /** Array is returned in ascending order. */
    sortBy<K extends Sortable>(f: (el: T) => K): T[];
    /** Array is returned in ascending order. */
    sortByKey<K extends KeysOfType<T, Sortable>>(key: K): T[];
    /**
     * Splits `array` into two: one array with elements that satisfy `f`, and one with elements that do not.
     *
     * partition(["foo1", "bar", "foo2"], (s: string) => s.startsWith("foo"))
     * => [["foo1", "foo2"], ["bar"]]
     */
    partition(f: (el: T) => boolean): [T[], T[]];
    /**
     * Chainable substitution for `forEach`. Only use if actually necessary.
     * Be careful with side effects if you actually use this in the middle
     * of a chain.
     */
    each(f: (el: T, index: number, array: T[]) => any): T[];
    /** Helper for filtering arrays on async predicates. */
    asyncFilter(predicate: (v: T) => Promise<boolean>): Promise<Array<T>>;
    asyncMap<V>(f: (el: T, index: number, array: T[]) => Promise<V>): Promise<V[]>;
    asyncForEach(f: (el: T, index: number, array: T[]) => Promise<any>): Promise<void>;
    sum(this: ReadonlyArray<number | undefined>): number;
    sum(f: (el: T, index: number, array: ReadonlyArray<T>) => number | undefined): number;
    sum(f: (el: T, index: number, array: ReadonlyArray<T>) => Promise<number | undefined>): Promise<number>;
    /**
     * Sums numbers but will return `undefined` if either a) there are no numbers or b) they are all
     * `null` or `undefined`.
     *
     * This is to mitigate the "tables of meaningless zeros" that our team experienced in CoConstruct,
     * i.e. not being able to tell "is this zero b/c someone typed zero in?" vs. "is this zero b/c it
     * just doesn't have a value yet"?
     */
    sumOrUndefined(this: ReadonlyArray<number | undefined>): number | undefined;
    sumOrUndefined(f: (el: T, index: number, array: ReadonlyArray<T>) => number | undefined): number | undefined;
    sumOrUndefined(
      f: (el: T, index: number, array: ReadonlyArray<T>) => Promise<number | undefined>,
    ): Promise<number | undefined>;
    groupBy<K extends PropertyKey, Y = T>(this: readonly T[], fn: (x: T) => K, valueFn?: (x: T) => Y): Record<K, Y[]>;
    groupByObject<O, Y = T>(this: readonly T[], fn: (x: T) => O, valueFn?: (x: T) => Y): Array<[O, Y[]]>;
    keyBy<K extends keyof T>(
      this: readonly T[],
      field: T[K] extends PropertyKey ? T[K] : never,
    ): Record<PropertyKey, T>;
    keyBy<K extends PropertyKey, Y = T>(this: readonly T[], fn: (x: T) => K, valueFn?: (x: T) => Y): Record<K, Y>;
    keyByObject<O, Y = T>(this: readonly T[], fn: (x: T) => O, valueFn?: (x: T) => Y): Map<O, Y>;
    batched(n: number): T[][];
    findBefore(el: T): T | undefined;
    findAfter(el: T): T | undefined;
    sentenceJoin(opts?: { word?: "and" | "or"; separator?: string }): string;
    toObject<K extends PropertyKey, T>(this: ReadonlyArray<readonly [K, T]>): Record<K, T>;
    mapToObject<K extends PropertyKey, T, U>(
      this: ReadonlyArray<T>,
      f: (el: T, index: number, array: Array<T>) => [K, U],
    ): Record<K, U>;
    max(this: readonly number[] | readonly Date[]): T;
    max<R extends number | Date>(f: (el: T, index: number, array: readonly T[]) => R): R;
    min(this: readonly number[] | readonly Date[]): T;
    min<R extends number | Date>(f: (el: T, index: number, array: readonly T[]) => R): R;
    count(f: (el: T, index: number, array: readonly T[]) => boolean): number;
    unanimous(f: (el: T) => unknown): boolean;
  }
}

export type Sortable = string | number | Date;

function isDefined<T extends any>(param: T | undefined | null): param is T {
  return param !== null && param !== undefined;
}

Array.prototype.unique = function () {
  return [...new Set(this)];
};

/** Would be cool to allow an array of keys to make the criteria of "unique" more flexible */
Array.prototype.uniqueByKey = function <T>(key: keyof T): T[] {
  const result: T[] = [];
  const group = this.groupBy((item) => item[key]);
  Object.keys(group).forEach((gKey) => {
    result.push(group[gKey].first);
  });
  return result;
};

Array.prototype.compact = function () {
  return this.filter(isDefined);
};

Array.prototype.sortBy = function <T, K extends Sortable>(this: Array<T>, f: (el: T) => K): T[] {
  return [...this].sort((a, b) => {
    const av = f(a);
    const bv = f(b);
    if (!isDefined(av) || !isDefined(bv)) {
      return !av && !bv ? 0 : !av ? 1 : -1;
    } else if (typeof av === "number" && typeof bv === "number") {
      return av - bv;
    } else if (typeof av === "string" && typeof bv === "string") {
      return av.localeCompare(bv);
    } else if (av instanceof Date && bv instanceof Date) {
      return (av as Date).getTime() - (bv as Date).getTime();
    } else {
      throw new Error(`Unsupported sortBy values ${av}, ${bv}`);
    }
  });
};

Array.prototype.sortByKey = function <T, K extends KeysOfType<T, Sortable>>(this: Array<T>, key: K): T[] {
  return this.sortBy((el) => el[key] as any as Sortable);
};

Array.prototype.remove = function (element) {
  const index = this.indexOf(element);
  if (index > -1) {
    this.splice(index, 1);
  }
};

Array.prototype.partition = function <T>(this: Array<T>, f: (el: T) => boolean): [T[], T[]] {
  const [trueElements, falseElements] = [[] as T[], [] as T[]];
  this.forEach((el) => (f(el) ? trueElements : falseElements).push(el));
  return [trueElements, falseElements];
};

Array.prototype.each = function <T>(this: Array<T>, f: (el: T, index: number, array: T[]) => boolean): T[] {
  this.forEach(f);
  return this;
};

Array.prototype.asyncFilter = async function <T>(
  this: Array<T>,
  predicate: (v: T) => Promise<boolean>,
): Promise<Array<T>> {
  const results = await this.asyncMap(predicate);
  return this.filter((_v, index) => results[index]);
};

Array.prototype.asyncMap = async function <T, V>(
  this: Array<T>,
  f: (el: T, index: number, array: T[]) => Promise<V>,
): Promise<Array<V>> {
  return Promise.all(this.map(f));
};

Array.prototype.asyncForEach = async function <T>(
  this: Array<T>,
  f: (el: T, index: number, array: T[]) => Promise<any>,
): Promise<void> {
  return Promise.all(this.map(f)).then(() => {});
};

function sum(numbers: (number | undefined)[]) {
  return numbers.reduce((result: number, number) => result + (number ?? 0), 0);
}

Array.prototype.sum = function <T>(
  this: Array<T>,
  f?:
    | ((el: T, index: number, array: T[]) => number | undefined)
    | ((el: T, index: number, array: T[]) => Promise<number | undefined>),
): number | Promise<number> {
  const promisesOrNumbers = f ? (this.map(f as any) as (number | undefined)[] | Promise<number | undefined>[]) : this;

  if (promisesOrNumbers.some((v) => v instanceof Promise)) {
    return Promise.all(promisesOrNumbers as Promise<number | undefined>[]).then(sum);
  } else {
    return sum(promisesOrNumbers as (number | undefined)[]);
  }
} as any;

function sumOrUndefined(numbers: (number | undefined)[]) {
  return numbers.every((n) => n === undefined)
    ? undefined
    : numbers.reduce((result: number, number) => result + (number ?? 0), 0);
}

Array.prototype.sumOrUndefined = function <T>(
  this: Array<T>,
  f?:
    | ((el: T, index: number, array: T[]) => number | undefined)
    | ((el: T, index: number, array: T[]) => Promise<number | undefined>),
): number | undefined | Promise<number | undefined> {
  const promisesOrNumbers = f ? (this.map(f as any) as (number | undefined)[] | Promise<number | undefined>[]) : this;

  if (promisesOrNumbers.first instanceof Promise) {
    return Promise.all(promisesOrNumbers as Promise<number | undefined>[]).then(sumOrUndefined);
  } else {
    return sumOrUndefined(promisesOrNumbers as (number | undefined)[]);
  }
} as any;

Array.prototype.groupBy = function <K extends PropertyKey, T, Y = T>(
  this: T[],
  fn: (x: T) => K,
  valueFn?: (x: T) => Y,
): Record<K, Y[]> {
  const result = {} as Record<K, Y[]>;
  this.forEach((o) => {
    const group = fn(o);
    result[group] ??= [];
    result[group].push(valueFn ? valueFn(o) : (o as any as Y));
  });
  return result;
};
Array.prototype.groupByObject = function <T, O, Y = T>(
  this: T[],
  fn: (x: T) => O,
  valueFn?: (x: T) => Y,
): Array<[O, Y[]]> {
  const result = new Map<O, Y[]>();
  this.forEach((o) => {
    const key = fn(o);
    let group = result.get(key);
    if (group === undefined) {
      group = [];
      result.set(key, group);
    }
    group.push(valueFn ? valueFn(o) : (o as any as Y));
  });
  return [...result.entries()];
};

Array.prototype.batched = function <T>(this: Array<T>, n: number): T[][] {
  const result = [] as T[][];
  for (let i = 0; i < this.length; i += n) {
    result.push(this.slice(i, i + n));
  }
  return result;
};

Array.prototype.keyBy = function <
  T,
  K extends PropertyKey,
  TK extends keyof T,
  TKK extends T[TK] extends K ? TK : never,
  Y = T,
>(fnOrKey: ((x: T) => K) | TKK, valueFn?: (x: T) => Y) {
  const result = {} as Record<K, Y>;
  const fn = typeof fnOrKey === "function" ? fnOrKey : (x: T) => x[fnOrKey] as K;
  this.forEach((o) => {
    const group = fn(o);
    if (result[group] !== undefined) {
      throw new Error(`${String(group)} already had a value assigned`);
    }
    result[group] = valueFn ? valueFn(o) : (o as any as Y);
  });
  return result;
};

Array.prototype.keyByObject = function <O, T, Y = T>(fn: (x: T) => O, valueFn?: (x: T) => Y) {
  const result = new Map<O, Y>();
  this.forEach((o) => {
    const group = fn(o);
    if (result.has(group)) {
      throw new Error(`${String(group)} already had a value assigned`);
    }
    result.set(group, valueFn ? valueFn(o) : (o as any as Y));
  });
  return result;
};

Array.prototype.findBefore = function <T>(this: Array<T>, el: T): T | undefined {
  const index = this.first === el ? -1 : this.indexOf(el);
  return index === -1 ? undefined : this[index - 1];
};

Array.prototype.findAfter = function <T>(this: Array<T>, el: T): T | undefined {
  const index = this.last === el ? -1 : this.indexOf(el);
  return index === -1 ? undefined : this[index + 1];
};

Array.prototype.findAndRemove = function <T>(
  this: Array<T>,
  predicate: (this: void, value: T, index: number, obj: T[]) => boolean,
): T | undefined {
  const val = this.find(predicate);
  if (!val) {
    return undefined;
  }
  this.remove(val);
  return val;
};

Array.prototype.sentenceJoin = function <T>(
  this: Array<T>,
  opts?: { word?: "and" | "or"; separator?: string },
): string {
  const { word = "and", separator = ", " } = opts ?? {};

  if (this.length > 2) {
    return `${this.slice(0, -1).join(separator)} ${word} ${this.last}`;
  } else if (this.length === 2) {
    return `${this.first} ${word} ${this.last}`;
  } else {
    return `${this.first ?? ""}`;
  }
};

Array.prototype.toObject = function <K extends PropertyKey, T>(this: Array<[K, T]>): Record<K, T> {
  return Object.fromEntries(this) as any;
};

Array.prototype.mapToObject = function <K extends PropertyKey, T, U>(
  this: Array<T>,
  f: (el: T, index: number, array: Array<T>) => [K, U],
): Record<K, U> {
  return this.map(f).toObject();
};

Array.prototype.max = function <T, R extends number | Date>(
  this: T[] | R[],
  f?: (el: T, index: number, array: T[]) => R,
): R {
  const values = f ? ((this as T[]).map(f) as R[]) : (this as R[]);
  const result: number = Math.max(...(values as number[]));
  return values.first instanceof Date ? (new Date(result) as R) : (result as R);
};

Array.prototype.min = function <T, R extends number | Date>(
  this: T[] | R[],
  f?: (el: T, index: number, array: T[]) => R,
): R {
  const values = f ? ((this as T[]).map(f) as R[]) : (this as R[]);
  const result: number = Math.min(...(values as number[]));
  return values.first instanceof Date ? (new Date(result) as R) : (result as R);
};

Array.prototype.count = function <T>(this: T[], f: (el: T, index: number, array: T[]) => boolean): number {
  return this.reduce((count, ...args) => (f(...args) ? count + 1 : count), 0);
};

Array.prototype.unanimous = function <T>(this: T[], f: (el: T) => unknown): boolean {
  const [first, ...rest] = this;
  const comparator = f(first);
  return rest.every((el) => f(el) === comparator);
};

Object.defineProperty(Array.prototype, "isEmpty", {
  enumerable: false,
  get: function () {
    return this.length === 0;
  },
});

Object.defineProperty(Array.prototype, "nonEmpty", {
  enumerable: false,
  get: function () {
    return this.length > 0;
  },
});

Object.defineProperty(Array.prototype, "first", {
  enumerable: false,
  get: function () {
    return this[0];
  },
});

Object.defineProperty(Array.prototype, "last", {
  enumerable: false,
  get: function () {
    return this.isEmpty ? undefined : this[this.length - 1];
  },
});
