export function sentenceJoinImpl<T>(this: T[], opts?: { word?: "and" | "or"; separator?: string }): string {
  const { word = "and", separator = ", " } = opts ?? {};

  if (this.length > 2) {
    return `${this.slice(0, -1).join(separator)} ${word} ${this.last}`;
  } else if (this.length === 2) {
    return `${this.first} ${word} ${this.last}`;
  } else {
    return `${this.first ?? ""}`;
  }
}

export function sentenceJoin<T>(arr: T[], opts?: { word?: "and" | "or"; separator?: string }): string {
  return sentenceJoinImpl.call<T[], [{ word?: "and" | "or"; separator?: string } | undefined], string>(arr, opts);
}
