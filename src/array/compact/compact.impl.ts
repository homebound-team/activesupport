import { isDefined } from "src/utils";

export function compactImpl<T extends any>(this: T[]): NonNullable<T>[] {
  return this.filter(isDefined) as NonNullable<T>[];
}

export function compact<T>(arr: T[]): NonNullable<T>[] {
  return compactImpl.call<T[], [], NonNullable<T>[]>(arr);
}
