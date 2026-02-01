import { CallbackFn, CallbackFnEither, CallbackFnRO } from "src/array/utils";

export function partition<T, U = T>(arr: T[], fn: CallbackFn<T, boolean>, valueFn?: CallbackFn<T, U>): [U[], U[]];
export function partition<T, U = T>(
  arr: readonly T[],
  fn: CallbackFnRO<T, boolean>,
  valueFn?: CallbackFnRO<T, U>,
): [U[], U[]];
export function partition<T, U = T>(
  arr: readonly T[],
  fn: CallbackFnEither<T, boolean>,
  valueFn?: CallbackFnEither<T, U>,
): [U[], U[]] {
  const [trueElements, falseElements] = [[] as U[], [] as U[]];
  (arr as T[]).forEach((e, i, a) =>
    (fn(e, i, a) ? trueElements : falseElements).push(valueFn ? valueFn(e, i, a) : (e as any)),
  );
  return [trueElements, falseElements];
}
