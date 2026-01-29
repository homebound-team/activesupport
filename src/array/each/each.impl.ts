export function eachImpl<T>(this: T[], f: (el: T, index: number, array: T[]) => boolean): T[] {
  this.forEach(f);
  return this;
}

export function each<T>(arr: T[], f: (el: T, index: number, array: T[]) => boolean): T[] {
  return eachImpl.call<T[], [(el: T, index: number, array: T[]) => boolean], T[]>(arr, f);
}
