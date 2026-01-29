export function isEmptyImpl<T>(this: T[]): boolean {
  return this.length === 0;
}

export function isEmpty<T>(arr: T[]): boolean {
  return isEmptyImpl.call<T[], [], boolean>(arr);
}
