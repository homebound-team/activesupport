export function nonEmptyImpl<T>(this: T[]): boolean {
  return this.length > 0;
}

export function nonEmpty<T>(arr: T[]): boolean {
  return nonEmptyImpl.call<T[], [], boolean>(arr);
}
