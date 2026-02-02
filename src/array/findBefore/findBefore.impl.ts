/**
 * Returns the element that comes immediately before the specified element in the array.
 * @param el The element to find the predecessor of
 * @returns The element before the specified element, or undefined if el is first, not found, or the array is empty
 * @example ["a", "b", "c"].findBefore("c") //=> "b"
 * @example ["a", "b", "c"].findBefore("a") //=> undefined
 * @example ["a", "b", "c"].findBefore("d") //=> undefined
 */
export function findBefore<T>(arr: readonly T[], el: T): T | undefined {
  const index = arr.indexOf(el);
  return index < 1 ? undefined : arr[index - 1];
}
