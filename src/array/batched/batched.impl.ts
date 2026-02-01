export function batched<T>(arr: readonly T[], n: number): T[][] {
  const result = [] as T[][];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}
