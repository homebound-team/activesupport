/**
 * Returns the element that comes immediately before the specified element in an array.
 * @param arr The array to search
 * @param el The element to find the predecessor of
 * @returns The element before the specified element, or undefined if el is first, not found, or the array is empty
 * @example findBefore(["a", "b", "c"], "c") //=> "b"
 * @example findBefore(["a", "b", "c"], "a") //=> undefined
 * @example findBefore(["a", "b", "c"], "d") //=> undefined
 */
export function findBefore<T>(arr: readonly T[], el: T): T | undefined {
  const index = arr.indexOf(el);
  return index < 1 ? undefined : arr[index - 1];
}
