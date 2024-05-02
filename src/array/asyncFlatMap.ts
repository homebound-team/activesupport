import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    asyncFlatMap<V>(fn: CallbackFn<T, Promise<V | V[]>>): Promise<V[]>;
  }

  interface ReadonlyArray<T> {
    asyncFlatMap<V>(fn: CallbackFnRO<T, Promise<V | V[]>>): Promise<V[]>;
  }
}

Array.prototype.asyncFlatMap = async function <T, V>(this: T[], fn: CallbackFn<T, Promise<V | V[]>>): Promise<V[]> {
  return Promise.all(this.map(fn)).then((result) => result.flat(1) as V[]);
};
