export function findFirstImpl<T, U>(this: T[], fn: (element: T) => U | undefined): U | undefined {
  for (const element of this) {
    const result = fn(element);
    if (result !== undefined) {
      return result;
    }
  }
  return undefined;
}

export function findFirst<T, U>(arr: T[], fn: (element: T) => U | undefined): U | undefined {
  return findFirstImpl.call<T[], [(element: T) => U | undefined], U | undefined>(arr, fn);
}
