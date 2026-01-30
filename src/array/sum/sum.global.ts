import { sumImpl } from "src/array/sum/sum.impl";
import { CallbackFn, CallbackFnRO } from "src/array/utils";

declare global {
  interface Array<T> {
    /**
     * Sums all numbers in the array, treating `undefined` as 0. Returns 0 for empty arrays.
     * @returns The sum of all numbers
     * @example [1, 2, 3].sum() //=> 6
     * @example [1, undefined, 3].sum() //=> 4
     * @example [].sum() //=> 0
     */
    sum(this: (number | undefined)[]): number;
    /**
     * Sums values extracted by a callback, treating `undefined` as 0. Returns 0 for empty arrays.
     * @param f A function that returns a number for each element
     * @returns The sum of all returned numbers
     * @example [{x: 1}, {x: 2}].sum(o => o.x) //=> 3
     */
    sum(f: CallbackFn<T, number | undefined>): number;
    /**
     * Sums values extracted by an async callback, treating `undefined` as 0.
     * @param f An async function that returns a number for each element
     * @returns A promise resolving to the sum of all returned numbers
     * @example await [{x: 1}, {x: 2}].sum(async o => o.x) //=> 3
     */
    sum(f: CallbackFn<T, Promise<number | undefined>>): Promise<number>;
    /**
     * Sums all bigints in the array, treating `undefined` as 0n. Returns 0n for empty arrays.
     * @returns The sum of all bigints
     * @example [1n, 2n, 3n].sum() //=> 6n
     */
    sum(this: (bigint | undefined)[]): bigint;
    /**
     * Sums bigint values extracted by a callback, treating `undefined` as 0n.
     * @param f A function that returns a bigint for each element
     * @returns The sum of all returned bigints
     */
    sum(f: CallbackFn<T, bigint | undefined>): bigint;
    /**
     * Sums bigint values extracted by an async callback, treating `undefined` as 0n.
     * @param f An async function that returns a bigint for each element
     * @returns A promise resolving to the sum of all returned bigints
     */
    sum(f: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint>;
  }

  interface ReadonlyArray<T> {
    /**
     * Sums all numbers in the array, treating `undefined` as 0. Returns 0 for empty arrays.
     * @returns The sum of all numbers
     * @example [1, 2, 3].sum() //=> 6
     * @example [1, undefined, 3].sum() //=> 4
     * @example [].sum() //=> 0
     */
    sum(this: readonly (number | undefined)[]): number;
    /**
     * Sums values extracted by a callback, treating `undefined` as 0. Returns 0 for empty arrays.
     * @param f A function that returns a number for each element
     * @returns The sum of all returned numbers
     * @example [{x: 1}, {x: 2}].sum(o => o.x) //=> 3
     */
    sum(f: CallbackFnRO<T, number | undefined>): number;
    /**
     * Sums values extracted by an async callback, treating `undefined` as 0.
     * @param f An async function that returns a number for each element
     * @returns A promise resolving to the sum of all returned numbers
     * @example await [{x: 1}, {x: 2}].sum(async o => o.x) //=> 3
     */
    sum(f: CallbackFnRO<T, Promise<number | undefined>>): Promise<number>;
    /**
     * Sums all bigints in the array, treating `undefined` as 0n. Returns 0n for empty arrays.
     * @returns The sum of all bigints
     * @example [1n, 2n, 3n].sum() //=> 6n
     */
    sum(this: (bigint | undefined)[]): bigint;
    /**
     * Sums bigint values extracted by a callback, treating `undefined` as 0n.
     * @param f A function that returns a bigint for each element
     * @returns The sum of all returned bigints
     */
    sum(f: CallbackFn<T, bigint | undefined>): bigint;
    /**
     * Sums bigint values extracted by an async callback, treating `undefined` as 0n.
     * @param f An async function that returns a bigint for each element
     * @returns A promise resolving to the sum of all returned bigints
     */
    sum(f: CallbackFn<T, Promise<bigint | undefined>>): Promise<bigint>;
  }
}

Array.prototype.sum = sumImpl as (typeof Array.prototype)["sum"];
