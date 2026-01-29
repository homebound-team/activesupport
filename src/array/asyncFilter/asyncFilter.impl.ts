import { CallbackFn } from "src/array/utils";

export async function asyncFilterImpl<T>(this: T[], predicate: CallbackFn<T, Promise<boolean>>): Promise<T[]> {
  const results = await this.asyncMap(predicate);
  return this.filter((_v, index) => results[index]);
}

export async function asyncFilter<T>(arr: T[], predicate: CallbackFn<T, Promise<boolean>>): Promise<T[]> {
  return asyncFilterImpl.call<T[], [CallbackFn<T, Promise<boolean>>], Promise<T[]>>(arr, predicate);
}
