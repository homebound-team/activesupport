export function batchedImpl<T>(this: T[], n: number): T[][] {
  const result = [] as T[][];
  for (let i = 0; i < this.length; i += n) {
    result.push(this.slice(i, i + n));
  }
  return result;
}

export function batched<T>(arr: T[], n: number): T[][] {
  return batchedImpl.call<T[], [number], T[][]>(arr, n);
}
