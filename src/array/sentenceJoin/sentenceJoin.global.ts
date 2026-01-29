import { sentenceJoinImpl } from "src/array/sentenceJoin/sentenceJoin.impl";

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

Array.prototype.sentenceJoin = sentenceJoinImpl;
