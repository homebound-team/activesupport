import { CallbackFn, CallbackFnRO } from "./index";

declare global {
  interface Array<T> {
    /**
     * Creates a Map index where each element can be associated with multiple keys.
     * Unlike `groupBy`, elements can appear under multiple keys (e.g., tags, categories).
     * @param fn A function that returns an array of keys for each element
     * @param valueFn Optional function to transform each element before indexing
     * @returns A Map where each key maps to an array of matching values
     * @example [{id: 1, tags: ["red", "small"]}].indexBy(item => item.tags) //=> Map{"red" => [{id: 1, tags: ["red", "small"]}], "small" => [...]}
     * @example [{id: 1, tags: ["a"]}].indexBy(item => item.tags, item => item.id) //=> Map{"a" => [1]}
     * @example [].indexBy(() => []) //=> Map{}
     */
    indexBy<O, Y = T>(fn: CallbackFn<T, O[]>, valueFn?: CallbackFn<T, Y>): Map<O, Y[]>;
  }

  interface ReadonlyArray<T> {
    /**
     * Creates a Map index where each element can be associated with multiple keys.
     * Unlike `groupBy`, elements can appear under multiple keys (e.g., tags, categories).
     * @param fn A function that returns an array of keys for each element
     * @param valueFn Optional function to transform each element before indexing
     * @returns A Map where each key maps to an array of matching values
     * @example [{id: 1, tags: ["red", "small"]}].indexBy(item => item.tags) //=> Map{"red" => [{id: 1, tags: ["red", "small"]}], "small" => [...]}
     * @example [{id: 1, tags: ["a"]}].indexBy(item => item.tags, item => item.id) //=> Map{"a" => [1]}
     * @example [].indexBy(() => []) //=> Map{}
     */
    indexBy<O, Y = T>(fn: CallbackFnRO<T, O[]>, valueFn?: CallbackFnRO<T, Y>): Map<O, Y[]>;
  }
}

Array.prototype.indexBy = function <T, O, Y = T>(
  this: T[],
  fn: CallbackFn<T, O[]>,
  valueFn?: CallbackFn<T, Y>,
): Map<O, Y[]> {
  const result = new Map<O, Y[]>();
  this.forEach((e, i, a) => {
    for (const key of fn(e, i, a).unique()) {
      let group = result.get(key);
      if (group === undefined) {
        group = [];
        result.set(key, group);
      }
      group.push(valueFn ? valueFn(e, i, a) : (e as any as Y));
    }
  });
  return result;
};
