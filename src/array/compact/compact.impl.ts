import { isDefined } from "src/utils";

export function compact<T>(arr: readonly T[]): NonNullable<T>[] {
  return arr.filter(isDefined) as NonNullable<T>[];
}
