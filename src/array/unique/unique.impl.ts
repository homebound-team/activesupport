export function uniqueImpl<T>(this: T[]): T[] {
  return new Set(this).values().toArray();
}

export function unique<T>(arr: T[]): T[] {
  return uniqueImpl.call<T[], [], T[]>(arr);
}
