import type { Equal, Expect } from "@type-challenges/utils";

// 使用数组的推导将所有值推导到 R 中，最后构造一个数组就可
// type Push<T extends any[], U> = T extends [...infer R] ? [...R, U] : [];

// 还有一个更简单的，直接解构具体的值
type Push<T extends any[], U> = [...T, U];

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], "3">, [1, 2, "3"]>>,
  Expect<Equal<Push<["1", 2, "3"], boolean>, ["1", 2, "3", boolean]>>
];
