export function findBeforeImpl<T>(this: T[], el: T): T | undefined {
  const index = this.first === el ? -1 : this.indexOf(el);
  return index === -1 ? undefined : this[index - 1];
}

export function findBefore<T>(arr: T[], el: T): T | undefined {
  return findBeforeImpl.call<T[], [T], T | undefined>(arr, el);
}
