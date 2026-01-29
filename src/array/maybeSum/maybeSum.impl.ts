import { CallbackFn } from "src/array/utils";
import { MaybePromise, maybePromiseAllThen } from "src/utils";

export function maybeSumImpl<T, R extends number | bigint | undefined>(
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

export function maybeSum<T, R extends number | undefined>(arr: R[]): R;
export function maybeSum<T, R extends number | undefined>(arr: T[], f: CallbackFn<T, R>): R;
export function maybeSum<T, R extends number | undefined>(arr: T[], f: CallbackFn<T, Promise<R>>): Promise<R>;
export function maybeSum<T, R extends bigint | undefined>(arr: R[]): R;
export function maybeSum<T, R extends bigint | undefined>(arr: T[], f: CallbackFn<T, R>): R;
export function maybeSum<T, R extends bigint | undefined>(arr: T[], f: CallbackFn<T, Promise<R>>): Promise<R>;
export function maybeSum<T, R extends number | bigint | undefined>(
  arr: T[] | R[],
  fn?: CallbackFn<T, MaybePromise<R>>,
): MaybePromise<number | bigint | undefined> {
  return maybeSumImpl.call<
    T[] | R[],
    [CallbackFn<T, MaybePromise<R>> | undefined],
    MaybePromise<number | bigint | undefined>
  >(arr, fn);
}
