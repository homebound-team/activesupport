export function firstImpl<T>(this: T[]): T | undefined {
  return this.isEmpty ? undefined : this[0];
}

export function first<T>(arr: T[]): T | undefined {
  return firstImpl.call<T[], [], T | undefined>(arr);
}
