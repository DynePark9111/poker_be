export function arraySubtract(arr1: string[], arr2: string[]) {
  const result = [];
  for (const element of arr1) {
    if (!arr2.includes(element)) {
      result.push(element);
    }
  }
  return result;
}
