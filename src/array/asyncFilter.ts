import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /** Helper for filtering arrays on async predicates. */
    asyncFilter(predicate: CallbackFn<T, Promise<boolean>>): Promise<T[]>;
  }

  interface ReadonlyArray<T> {
    /** Helper for filtering arrays on async predicates. */
    asyncFilter(predicate: CallbackFnRO<T, Promise<boolean>>): Promise<T[]>;
  }
}

Array.prototype.asyncFilter = async function <T>(this: T[], predicate: CallbackFn<T, Promise<boolean>>): Promise<T[]> {
  const results = await this.asyncMap(predicate);
  return this.filter((_v, index) => results[index]);
};
