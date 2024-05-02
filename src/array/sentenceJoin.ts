export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    sentenceJoin(opts?: { word?: "and" | "or"; separator?: string }): string;
  }

  interface ReadonlyArray<T> {
    sentenceJoin(opts?: { word?: "and" | "or"; separator?: string }): string;
  }
}

Array.prototype.sentenceJoin = function <T>(this: T[], opts?: { word?: "and" | "or"; separator?: string }): string {
  const { word = "and", separator = ", " } = opts ?? {};

  if (this.length > 2) {
    return `${this.slice(0, -1).join(separator)} ${word} ${this.last}`;
  } else if (this.length === 2) {
    return `${this.first} ${word} ${this.last}`;
  } else {
    return `${this.first ?? ""}`;
  }
};
