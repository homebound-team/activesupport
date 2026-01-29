export function intersectionImpl<T>(this: T[], other: T[]): T[] {
  return [...new Set(this).intersection(new Set(other))];
}

export function intersection<T>(arr: T[], other: T[]): T[] {
  return intersectionImpl.call<T[], [T[]], T[]>(arr, other);
}
