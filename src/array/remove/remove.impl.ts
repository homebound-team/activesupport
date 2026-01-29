export function removeImpl<T>(this: T[], ...elements: readonly T[]) {
  this.removeAll(elements);
}

export function remove<T>(arr: T[], ...elements: readonly T[]) {
  return removeImpl.call<T[], readonly T[], void>(arr, ...elements);
}
