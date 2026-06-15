import type { Equal, Expect } from "@type-challenges/utils";

// 构建数组
type CreateArray<T extends number, U extends any[] = []> = U["length"] extends T
  ? U
  : CreateArray<T, [...U, any]>;

// 借助数组来实现删除
type MinusOne<T extends number, U = CreateArray<T>> = U extends [
  infer _,
  ...infer R,
]
  ? R["length"]
  : never;

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
];
