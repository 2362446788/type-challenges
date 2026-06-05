import type { Equal, Expect } from "@type-challenges/utils";

// 就是简单的把数组结构，然后获取到最后一个值返回
type Last<T extends any[]> = T extends [...any[], infer R] ? R : never;

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];
