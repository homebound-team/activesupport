export function removeAll<T>(arr: T[], elements: readonly T[]) {
  if (arr.length === 0 || elements.length === 0) return;
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (!elements.includes(arr[i])) {
      // Shift elements that don't need to be removed towards the start of the array by the number of elements we've
      // already removed.  Skip if we haven't removed anything yet.
      if (index !== i) arr[index] = arr[i];
      index++;
    }
  }
  arr.length = index;
}
