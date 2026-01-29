export function findAfterImpl<T>(this: T[], el: T): T | undefined {
  const index = this.last === el ? -1 : this.indexOf(el);
  return index === -1 ? undefined : this[index + 1];
}

export function findAfter<T>(arr: T[], el: T): T | undefined {
  return findAfterImpl.call<T[], [T], T | undefined>(arr, el);
}
