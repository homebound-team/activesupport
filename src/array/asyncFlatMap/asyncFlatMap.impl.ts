import { CallbackFn } from "src/array/utils";

export async function asyncFlatMapImpl<T, V>(this: T[], fn: CallbackFn<T, Promise<V | V[]>>): Promise<V[]> {
  return Promise.all(this.map(fn)).then((result) => result.flat(1) as V[]);
}

export async function asyncFlatMap<T, V>(arr: T[], fn: CallbackFn<T, Promise<V | V[]>>): Promise<V[]> {
  return asyncFlatMapImpl.call<T[], [CallbackFn<T, Promise<V | V[]>>], Promise<V[]>>(arr, fn);
}
