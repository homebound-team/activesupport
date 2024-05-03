import { Temporal } from "temporal-polyfill";

export type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T];

export type MaybePromise<T> = Promise<T> | T;
type UnnestMaybePromise<T> = T extends Promise<infer U> ? Promise<U> : MaybePromise<T>;
export function maybePromiseThen<T, U>(maybePromise: MaybePromise<T>, callback: (obj: T) => Promise<U>): Promise<U>;
export function maybePromiseThen<T, U>(
  maybePromise: MaybePromise<T>,
  callback: (obj: T) => MaybePromise<U>,
): MaybePromise<U>;
export function maybePromiseThen<T, U>(maybePromise: MaybePromise<T>, callback: (obj: T) => U): MaybePromise<U>;
export function maybePromiseThen<T, U>(maybePromise: MaybePromise<T>, callback: (obj: T) => U): UnnestMaybePromise<U> {
  return (
    maybePromise instanceof Promise ? maybePromise.then(callback) : callback(maybePromise)
  ) as UnnestMaybePromise<U>;
}

export function maybePromiseAllThen<T, U>(
  maybePromises: MaybePromise<T>[],
  callback: (obj: T[]) => Promise<U>,
): Promise<U>;
export function maybePromiseAllThen<T, U>(
  maybePromises: MaybePromise<T>[],
  callback: (obj: T[]) => MaybePromise<U>,
): MaybePromise<U>;
export function maybePromiseAllThen<T, U>(maybePromises: MaybePromise<T>[], callback: (obj: T[]) => U): MaybePromise<U>;
export function maybePromiseAllThen<T, U>(
  maybePromises: MaybePromise<T>[],
  callback: (obj: T[]) => U,
): UnnestMaybePromise<U> {
  const maybePromise: MaybePromise<T[]> = maybePromises.some((v) => v instanceof Promise)
    ? (Promise.all(maybePromises) as Promise<T[]>)
    : (maybePromises as T[]);
  return maybePromiseThen(maybePromise, callback) as UnnestMaybePromise<U>;
}

export function isDefined<T extends any>(param: T | undefined | null): param is T {
  return param !== null && param !== undefined;
}

export type Comparable = string | number | bigint | Date | Temporal.PlainDate | Temporal.ZonedDateTime;

export function compare<T extends Comparable>(a: T, b: T): number {
  if (!isDefined(a) || !isDefined(b)) {
    return !a && !b ? 0 : !a ? 1 : -1;
  } else if (typeof a === "number" && typeof b === "number") {
    return a - b;
  } else if (typeof a === "bigint" && typeof b === "bigint") {
    return a < b ? -1 : a > b ? 1 : 0;
  } else if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  } else if (a instanceof Date && b instanceof Date) {
    return (a as Date).getTime() - (b as Date).getTime();
  } else if (a instanceof Temporal.ZonedDateTime && b instanceof Temporal.ZonedDateTime) {
    return Temporal.ZonedDateTime.compare(a, b);
  } else if (a instanceof Temporal.PlainDate && b instanceof Temporal.PlainDate) {
    return Temporal.PlainDate.compare(a, b);
  } else {
    throw new Error(`Unsupported compare ${a}, ${b}`);
  }
}
