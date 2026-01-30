export function removeAllImpl<T>(this: T[], elements: readonly T[]) {
  if (elements.length === 0) return;
  let deleteCount = 0;
  // start from the end of the array so we don't need to worry about re-ordering
  for (let index = this.length - 1; index >= 0; index--) {
    if (elements.includes(this[index])) {
      deleteCount++;
    } else if (deleteCount > 0) {
      // avoid reshuffling the array more than we need to.  splice can remove multiple items at once, so we keep track
      // of how many consecutive elements need to be removed and then do the actual removal in one go once we find an
      // element that should remain
      this.splice(index + 1, deleteCount);
      deleteCount = 0;
    }
  }
  // final splice if the starting element(s) should be removed
  if (deleteCount > 0) this.splice(0, deleteCount);
}

export function removeAll<T>(arr: T[], elements: readonly T[]) {
  return removeAllImpl.call<T[], [readonly T[]], void>(arr, elements);
}
