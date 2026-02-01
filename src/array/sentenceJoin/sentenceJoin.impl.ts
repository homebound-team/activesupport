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
