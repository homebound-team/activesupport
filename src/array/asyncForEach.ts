import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    asyncForEach(fn: CallbackFn<T, Promise<any>>): Promise<void>;
  }

  interface ReadonlyArray<T> {
    asyncForEach(fn: CallbackFnRO<T, Promise<any>>): Promise<void>;
  }
}

Array.prototype.asyncForEach = async function <T>(this: T[], fn: CallbackFn<T, Promise<any>>): Promise<void> {
  return Promise.all(this.map(fn)).then(() => {});
};
