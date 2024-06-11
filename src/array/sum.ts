import { MaybePromise, maybePromiseAllThen } from "../utils";
import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    sum(this: (number | undefined)[]): number;
    sum(f: CallbackFn<T, number | undefined>): number;
    sum(f: CallbackFn<T, Promise<number | undefined>>): Promise<number>;
    sum(this: (bigint | undefined)[]): bigint;
    sum(f: CallbackFn<T, bigint | undefined>): bigint;
    sum(f: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint>;
    /**
     * Sums numbers but will return `undefined` if either a) there are no numbers or b) they are all
     * `null` or `undefined`.
     *
     * This is to mitigate the "tables of meaningless zeros" that our team experienced in CoConstruct,
     * i.e. not being able to tell "is this zero b/c someone typed zero in?" vs. "is this zero b/c it
     * just doesn't have a value yet"?
     */
    maybeSum(this: (number | undefined)[]): number | undefined;
    maybeSum(f: CallbackFn<T, number | undefined>): number | undefined;
    maybeSum(f: CallbackFn<T, Promise<number | undefined>>): Promise<number | undefined>;
    maybeSum(this: (bigint | undefined)[]): bigint | undefined;
    maybeSum(f: CallbackFn<T, bigint | undefined>): bigint | undefined;
    maybeSum(f: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
  }

  interface ReadonlyArray<T> {
    sum(this: readonly (number | undefined)[]): number;
    sum(f: CallbackFnRO<T, number | undefined>): number;
    sum(f: CallbackFnRO<T, Promise<number | undefined>>): Promise<number>;
    sum(this: (bigint | undefined)[]): bigint;
    sum(f: CallbackFn<T, bigint | undefined>): bigint;
    sum(f: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint>;
    /**
     * Sums numbers but will return `undefined` if either a) there are no numbers or b) they are all
     * `null` or `undefined`.
     *
     * This is to mitigate the "tables of meaningless zeros" that our team experienced in CoConstruct,
     * i.e. not being able to tell "is this zero b/c someone typed zero in?" vs. "is this zero b/c it
     * just doesn't have a value yet"?
     */
    maybeSum(this: readonly (number | undefined)[]): number | undefined;
    maybeSum(f: CallbackFnRO<T, number | undefined>): number | undefined;
    maybeSum(f: CallbackFnRO<T, Promise<number | undefined>>): Promise<number | undefined>;
    maybeSum(this: readonly (bigint | undefined)[]): bigint | undefined;
    maybeSum(f: CallbackFn<T, bigint | undefined>): bigint | undefined;
    maybeSum(f: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint | undefined>;
  }
}

function sum<T, R extends number | undefined>(this: R[]): number;
function sum<T, R extends number | undefined>(f: CallbackFn<T, R>): number;
function sum<T, R extends number | undefined>(f: CallbackFn<T, Promise<R>>): Promise<number>;
function sum<T, R extends bigint | undefined>(this: R[]): bigint;
function sum<T, R extends bigint | undefined>(f: CallbackFn<T, R>): bigint;
function sum<T, R extends bigint | undefined>(f: CallbackFn<T, Promise<R>>): Promise<bigint>;
function sum<T, R extends number | bigint | undefined>(
  this: T[] | R[],
  fn?: CallbackFn<T, MaybePromise<R>>,
): MaybePromise<number | bigint> {
  const promisesOrNumbers = fn ? (this.map(fn as any) as R[] | Promise<R>[]) : (this as R[]);
  return maybePromiseAllThen(promisesOrNumbers, (numbers) => {
    let sum: bigint | number | undefined = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      const number = numbers[i];
      if (number !== undefined) {
        sum = (((sum ?? (typeof number === "bigint" ? 0n : 0)) as any) + number) as any;
      }
    }
    return sum ?? 0;
  });
}

Array.prototype.sum = sum;

function maybeSum<T, R extends number | undefined>(this: R[]): R;
function maybeSum<T, R extends number | undefined>(f: CallbackFn<T, R>): R;
function maybeSum<T, R extends number | undefined>(f: CallbackFn<T, Promise<R>>): Promise<R>;
function maybeSum<T, R extends bigint | undefined>(this: R[]): R;
function maybeSum<T, R extends bigint | undefined>(f: CallbackFn<T, R>): R;
function maybeSum<T, R extends bigint | undefined>(f: CallbackFn<T, Promise<R>>): Promise<R>;
function maybeSum<T, R extends number | bigint | undefined>(
  this: T[] | R[],
  fn?: CallbackFn<T, MaybePromise<R>>,
): MaybePromise<number | bigint | undefined> {
  const promisesOrNumbers = fn ? (this.map(fn as any) as R[] | Promise<R>[]) : (this as R[]);
  return maybePromiseAllThen(promisesOrNumbers, (numbers) => {
    let sum: bigint | number | undefined = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      const number = numbers[i];
      if (number !== undefined) {
        sum = (((sum ?? (typeof number === "bigint" ? 0n : 0)) as any) + number) as any;
      }
    }
    return sum;
  });
}

Array.prototype.maybeSum = maybeSum;
