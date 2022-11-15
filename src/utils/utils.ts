export function swap(arr: any, left: number, right: number) {
  let t = arr[left];
  arr[left] = arr[right];
  arr[right] = t;
}
