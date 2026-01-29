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
