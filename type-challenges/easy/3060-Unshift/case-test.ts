import type { Equal, Expect } from "@type-challenges/utils";

// 直接使用推导
// type Unshift<T, U> = T extends [...infer R] ? [U, ...R] : never;

// 更简单的直接解构
type Unshift<T extends any[], U> = [U, ...T];

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<["1", 2, "3"], boolean>, [boolean, "1", 2, "3"]>>
];
