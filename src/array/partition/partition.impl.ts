import { CallbackFn } from "src/array/utils";

export function partitionImpl<T, U = T>(this: T[], f: CallbackFn<T, boolean>, valueFn?: CallbackFn<T, U>): [U[], U[]] {
  const [trueElements, falseElements] = [[] as U[], [] as U[]];
  this.forEach((e, i, a) => (f(e, i, a) ? trueElements : falseElements).push(valueFn ? valueFn(e, i, a) : (e as any)));
  return [trueElements, falseElements];
}

export function partition<T, U = T>(arr: T[], f: CallbackFn<T, boolean>, valueFn?: CallbackFn<T, U>): [U[], U[]] {
  return partitionImpl.call<T[], [CallbackFn<T, boolean>, CallbackFn<T, U> | undefined], [U[], U[]]>(arr, f, valueFn);
}
