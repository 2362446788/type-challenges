import type { Equal, Expect } from "@type-challenges/utils";

// 直接使用数组的推导，推导出剩余的内容，将剩余内容直接返回即可
type Shift<T extends any[]> = T extends [any, ...infer R] ? R : never;

type cases = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<["a", "b", "c", "d"]>, ["b", "c", "d"]>>,
];
