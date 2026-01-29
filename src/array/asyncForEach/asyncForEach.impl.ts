import { CallbackFn } from "src/array/utils";

export async function asyncForEachImpl<T>(this: T[], fn: CallbackFn<T, Promise<any>>): Promise<void> {
  return Promise.all(this.map(fn)).then(() => {});
}

export async function asyncForEach<T>(arr: T[], fn: CallbackFn<T, Promise<any>>): Promise<void> {
  return asyncForEachImpl.call<T[], [CallbackFn<T, Promise<any>>], Promise<void>>(arr, fn);
}
