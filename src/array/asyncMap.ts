import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    asyncMap<V>(fn: CallbackFn<T, Promise<V>>): Promise<V[]>;
  }

  interface ReadonlyArray<T> {
    asyncMap<V>(fn: CallbackFnRO<T, Promise<V>>): Promise<V[]>;
  }
}

Array.prototype.asyncMap = async function <T, V>(this: T[], fn: CallbackFn<T, Promise<V>>): Promise<V[]> {
  return Promise.all(this.map(fn));
};
