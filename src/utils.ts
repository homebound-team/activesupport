import { Temporal } from "temporal-polyfill";

/**
 * Extracts keys from type T whose values extend type TProp.
 * Useful for getting only keys that point to a specific type.
 * @template T The object type to extract keys from
 * @template TProp The property type to filter by
 * @example
 * type Example = { name: string; age: number; active: boolean };
 * type StringKeys = KeysOfType<Example, string>; // "name"
 * type NumberKeys = KeysOfType<Example, number>; // "age"
 */
export type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp ? P : never }[keyof T];

/**
 * Represents a value that may or may not be wrapped in a Promise.
 * Useful for functions that can work with both synchronous and asynchronous values.
 * @template T The type of the value
 * @example
 * function process(value: MaybePromise<string>) { ... }
 * process("sync"); // works
 * process(Promise.resolve("async")); // also works
 */
export type MaybePromise<T> = Promise<T> | T;
type UnnestMaybePromise<T> = T extends Promise<infer U> ? Promise<U> : MaybePromise<T>;

/**
 * Applies a callback to a value that may or may not be a Promise.
 * If the input is a Promise, uses .then() to apply the callback.
 * If the input is not a Promise, applies the callback directly.
 * @template T The type of the input value
 * @template U The type of the callback result
 * @param maybePromise A value or Promise to process
 * @param callback Function to apply to the resolved value
 * @returns The result of the callback, maintaining Promise semantics
 * @example
 * maybePromiseThen(5, x => x * 2) //=> 10
 * maybePromiseThen(Promise.resolve(5), x => x * 2) //=> Promise.resolve(10)
 */
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

/**
 * Applies a callback to an array of values that may or may not be Promises.
 * If any value is a Promise, waits for all to resolve using Promise.all before applying the callback.
 * If no values are Promises, applies the callback directly to the array.
 * @template T The type of the input values
 * @template U The type of the callback result
 * @param maybePromises An array of values or Promises to process
 * @param callback Function to apply to the array of resolved values
 * @returns The result of the callback, maintaining Promise semantics
 * @example
 * maybePromiseAllThen([1, 2, 3], arr => arr.sum()) //=> 6
 * maybePromiseAllThen([Promise.resolve(1), 2, 3], arr => arr.sum()) //=> Promise.resolve(6)
 */
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

/**
 * Type guard that checks if a value is not null or undefined.
 * Useful for filtering arrays and narrowing types in TypeScript.
 * @template T The type of the value when defined
 * @param param The value to check
 * @returns True if the value is neither null nor undefined
 * @example
 * [1, null, 2, undefined, 3].filter(isDefined) //=> [1, 2, 3]
 * const x: string | undefined = getValue();
 * if (isDefined(x)) { x.toUpperCase(); } // x is narrowed to string
 */
export function isDefined<T extends any>(param: T | undefined | null): param is T {
  return param !== null && param !== undefined;
}

/**
 * Types that can be compared using the compare function.
 * Includes primitives (string, number, bigint), date types, and undefined.
 */
export type Comparable = string | number | bigint | Date | Temporal.PlainDate | Temporal.ZonedDateTime | undefined;

/**
 * Compares two values of the same Comparable type and returns a comparison result.
 * Returns negative if a < b, positive if a > b, or 0 if equal.
 * Handles undefined values (undefined is considered greater than defined values).
 * @template T The Comparable type being compared
 * @param a First value to compare
 * @param b Second value to compare
 * @returns Negative if a < b, positive if a > b, 0 if equal
 * @throws Error if the types are not supported for comparison
 * @example
 * compare(1, 2) //=> -1
 * compare("b", "a") //=> 1
 * compare(5, 5) //=> 0
 * compare(undefined, 10) //=> 1
 */
export function compare<T extends Comparable>(a: T, b: T): number {
  if (!isDefined(a) || !isDefined(b)) {
    return !a && !b ? 0 : !a ? 1 : -1;
  } else if (typeof a === "number" && typeof b === "number") {
    return compareNumbers(a, b);
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

function compareNumbers(a: number, b: number): number {
  const aIsNaN = isNaN(a);
  const bIsNaN = isNaN(b);
  if (aIsNaN && bIsNaN) return 0;
  if (aIsNaN) return 1; // NaN sorts to end (like undefined)
  if (bIsNaN) return -1;
  const diff = a - b;
  // Watch out for Infinity-Infinity=NaN
  return isNaN(diff) ? 0 : diff;
}

/**
 * Type-safe exhaustiveness check for switch statements and conditionals.
 * If this function is called, it means TypeScript's type system wasn't able to prove
 * that all cases were handled, which should never happen at runtime.
 * @param x A value that should be of type never (unreachable)
 * @throws Always throws an Error indicating an unexpected value was encountered
 * @example
 * type Status = "active" | "inactive";
 * function handleStatus(status: Status) {
 *   switch (status) {
 *     case "active": return "ok";
 *     case "inactive": return "paused";
 *     default: return assertNever(status); // Ensures all cases handled
 *   }
 * }
 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected value ${x}`);
}

interface ErrorClass<T extends Error> {
  new (...args: any[]): T;
}

/**
 * Throws an error with various options for how to specify the error.
 * Provides a flexible way to fail with different error types and messages.
 * @template T The Error type when using a custom error class
 * @throws Always throws an error (never returns)
 * @example
 * fail() //=> throws Error("Failed")
 * fail("Invalid input") //=> throws Error("Invalid input")
 * fail(new TypeError("Wrong type")) //=> throws the provided TypeError
 * fail(RangeError, "Out of bounds") //=> throws new RangeError("Out of bounds")
 */
export function fail(): never;
/**
 * Throws an Error with the provided message.
 * @param message The error message
 * @throws Always throws an Error with the specified message
 */
export function fail(message: string): never;
/**
 * Throws the provided Error instance.
 * @param error The Error instance to throw
 * @throws Always throws the provided Error
 */
export function fail(error: Error): never;
/**
 * Creates and throws an instance of the specified Error class with the provided arguments.
 * @template T The Error class type
 * @param errorClass The Error class constructor
 * @param args Arguments to pass to the Error constructor
 * @throws Always throws an instance of the specified Error class
 */
export function fail<T extends Error>(errorClass: ErrorClass<T>, ...args: any[]): never;
export function fail<T extends Error>(messageOrErrorOrClass?: string | Error | ErrorClass<T>, ...args: any[]): never {
  if (!isDefined(messageOrErrorOrClass)) {
    throw new Error("Failed");
  } else if (typeof messageOrErrorOrClass === "string") {
    throw new Error(messageOrErrorOrClass);
  } else if (messageOrErrorOrClass instanceof Error) {
    throw messageOrErrorOrClass;
  } else {
    args = args.length === 0 ? ["Failed"] : args;
    throw new messageOrErrorOrClass(...args);
  }
}
