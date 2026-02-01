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
 * A union of callback function types.  Mostly used for implementations of functions that support both mutable and
 * readonly overload signatures.
 * @template T The type of elements in the array
 * @template R The return type of the callback (defaults to any)
 */
export type CallbackFnEither<T, R = any> = CallbackFn<T, R> | CallbackFnRO<T, R>;
