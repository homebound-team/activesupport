import { hasSameLarge, hasSameSmall } from "src/array/hasSameElements/hasSameElements.impl";

export function notSameElementsImpl<T>(this: T[], other: readonly T[]): boolean {
  if (this.length !== other.length) return true;
  // Under 25 elements just do the linear scan / O(n^2) version
  if (this.length <= 25 && other.length <= 25) {
    return !hasSameSmall(this, other);
  } else {
    return !hasSameLarge(this, other);
  }
}

export function notSameElements<T>(arr: T[], other: readonly T[]): boolean {
  return notSameElementsImpl.call<T[], [readonly T[]], boolean>(arr, other);
}
