/**
 * Joins array elements into a grammatically correct sentence with commas and a conjunction.
 * @param arr - The array to join
 * @param opts - Optional settings for the conjunction word and separator
 * @returns A string representation of the array as a sentence
 * @example
 * sentenceJoin([5, 7, 9, 11])
 * //=> "5, 7, 9 and 11"
 * @example
 * sentenceJoin([5, 7])
 * //=> "5 and 7"
 * @example
 * sentenceJoin([5])
 * //=> "5"
 * @example
 * sentenceJoin([5, 7], {word: "or"})
 * //=> "5 or 7"
 * @example
 * sentenceJoin([])
 * //=> ""
 */
export function sentenceJoin<T>(arr: readonly T[], opts: { word?: "and" | "or"; separator?: string } = {}): string {
  const { word = "and", separator = ", " } = opts;
  if (arr.length > 2) {
    return `${arr.slice(0, -1).join(separator)} ${word} ${arr[arr.length - 1]}`;
  } else if (arr.length === 2) {
    return `${arr[0]} ${word} ${arr[1]}`;
  } else if (arr.length === 1) {
    return `${arr[0]}`;
  } else {
    return "";
  }
}
