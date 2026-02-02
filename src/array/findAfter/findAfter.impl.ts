/**
 * Returns the element that comes immediately after the specified element in the array.
 * @param el The element to find the successor of
 * @returns The element after the specified element, or undefined if el is last, not found, or the array is empty
 * @example ["a", "b", "c"].findAfter("a") //=> "b"
 * @example ["a", "b", "c"].findAfter("c") //=> undefined
 * @example ["a", "b", "c"].findAfter("d") //=> undefined
 */
export function findAfter<T>(arr: readonly T[], el: T): T | undefined {
  const index = arr[arr.length - 1] === el ? -1 : arr.indexOf(el);
  return index === -1 ? undefined : arr[index + 1];
}
