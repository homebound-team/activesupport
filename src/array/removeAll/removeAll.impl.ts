export function removeAllImpl<T>(this: T[], elements: readonly T[]) {
  if (elements.length === 0) return;
  // start from the end of the array so we don't need to worry about re-ordering
  for (let index = this.length - 1; index >= 0; index--) {
    if (elements.includes(this[index])) {
      this.splice(index, 1);
    }
  }
}

export function removeAll<T>(arr: T[], elements: readonly T[]) {
  return removeAllImpl.call<T[], [readonly T[]], void>(arr, elements);
}
