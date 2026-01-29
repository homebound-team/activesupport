export {}; // needed for TS to realize this file can be imported

declare global {
  interface Array<T> {
    /**
     * Joins array elements into a grammatically correct sentence with commas and a conjunction.
     * @param opts Optional settings for the conjunction word and separator
     * @returns A string representation of the array as a sentence
     * @example [5, 7, 9, 11].sentenceJoin() //=> "5, 7, 9 and 11"
     * @example [5, 7].sentenceJoin() //=> "5 and 7"
     * @example [5].sentenceJoin() //=> "5"
     * @example [5, 7].sentenceJoin({word: "or"}) //=> "5 or 7"
     * @example [].sentenceJoin() //=> ""
     */
    sentenceJoin(opts?: { word?: "and" | "or"; separator?: string }): string;
  }

  interface ReadonlyArray<T> {
    /**
     * Joins array elements into a grammatically correct sentence with commas and a conjunction.
     * @param opts Optional settings for the conjunction word and separator
     * @returns A string representation of the array as a sentence
     * @example [5, 7, 9, 11].sentenceJoin() //=> "5, 7, 9 and 11"
     * @example [5, 7].sentenceJoin() //=> "5 and 7"
     * @example [5].sentenceJoin() //=> "5"
     * @example [5, 7].sentenceJoin({word: "or"}) //=> "5 or 7"
     * @example [].sentenceJoin() //=> ""
     */
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
