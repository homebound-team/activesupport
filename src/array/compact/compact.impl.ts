import { isDefined } from "src/utils";

export function compactImpl<T>(this: T[]): NonNullable<T>[] {
  return this.filter(isDefined);
}

export function compact<T>(arr: T[]): NonNullable<T>[] {
  return compactImpl.call<T[], [], NonNullable<T>[]>(arr);
}
