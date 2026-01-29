export function lastImpl<T>(this: T[]): T | undefined {
  return this.isEmpty ? undefined : this[this.length - 1];
}

export function last<T>(arr: T[]): T | undefined {
  return lastImpl.call<T[], [], T | undefined>(arr);
}
