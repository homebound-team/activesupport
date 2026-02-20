import { batched } from "./batched.impl";

declare global {
  interface Array<T> {
    /**
     * Splits the array into chunks of a specified size.
     * The final chunk may contain fewer elements if the array length is not evenly divisible.
     * @param n The size of each batch
     * @returns An array of arrays, each containing up to n elements
     * @example [1, 2, 3, 4, 5, 6].batched(3) //=> [[1, 2, 3], [4, 5, 6]]
     * @example [1, 2, 3, 4, 5].batched(2) //=> [[1, 2], [3, 4], [5]]
     * @example [].batched(3) //=> []
     */
    batched(n: number): T[][];
  }

  interface ReadonlyArray<T> {
    /**
     * Splits the array into chunks of a specified size.
     * The final chunk may contain fewer elements if the array length is not evenly divisible.
     * @param n The size of each batch
     * @returns An array of arrays, each containing up to n elements
     * @example [1, 2, 3, 4, 5, 6].batched(3) //=> [[1, 2, 3], [4, 5, 6]]
     * @example [1, 2, 3, 4, 5].batched(2) //=> [[1, 2], [3, 4], [5]]
     * @example [].batched(3) //=> []
     */
    batched(n: number): T[][];
  }
}

Array.prototype.batched = function <T>(this: T[], n: number): T[][] {
  return batched(this, n);
};
