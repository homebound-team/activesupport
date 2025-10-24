import "./asyncFilter";
import "./asyncFlatMap";
import "./asyncForEach";
import "./asyncMap";
import "./asyncPartition";
import "./asyncSome";
import "./batched";
import "./compact";
import "./count";
import "./difference";
import "./each";
import "./everyHasSame";
import "./findAfter";
import "./findAndRemove";
import "./findBefore";
import "./findFirst";
import "./first";
import "./groupBy";
import "./hasSameElements";
import "./indexBy";
import "./intersection";
import "./isEmpty";
import "./keyBy";
import "./last";
import "./mapToObject";
import "./max";
import "./maxBy";
import "./min";
import "./minBy";
import "./nonEmpty";
import "./notSameElements";
import "./partition";
import "./remove";
import "./removeAll";
import "./sentenceJoin";
import "./sortBy";
import "./sum";
import "./toObject";
import "./unique";
import "./without";
import "./withoutAll";
import "./xor";

/**
 * A callback function type for array methods on mutable arrays.
 * Matches the signature of native array callback functions like map, filter, etc.
 * @template T The type of elements in the array
 * @template R The return type of the callback (defaults to any)
 */
export type CallbackFn<T, R = any> = (element: T, index: number, array: T[]) => R;

/**
 * A callback function type for array methods on readonly arrays.
 * Matches the signature of native array callback functions but with readonly arrays.
 * @template T The type of elements in the array
 * @template R The return type of the callback (defaults to any)
 */
export type CallbackFnRO<T, R = any> = (element: T, index: number, array: readonly T[]) => R;

/**
 * Utility type that converts a type to a mutable array type.
 * @template T The type to convert to an array
 */
export type ToArray<T> = T extends any ? T[] : never;

/**
 * Utility type that converts a type to a readonly array type.
 * @template T The type to convert to a readonly array
 */
export type ToReadonlyArray<T> = T extends any ? readonly T[] : never;
