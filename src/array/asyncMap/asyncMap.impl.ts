import { CallbackFn } from "src/array/utils";

export async function asyncMapImpl<T, V>(this: T[], fn: CallbackFn<T, Promise<V>>): Promise<V[]> {
  return Promise.all(this.map(fn));
}

export async function asyncMap<T, V>(arr: T[], fn: CallbackFn<T, Promise<V>>): Promise<V[]> {
  return asyncMapImpl.call<T[], [CallbackFn<T, Promise<V>>], Promise<V[]>>(arr, fn);
}
