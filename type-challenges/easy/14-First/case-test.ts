import { Equal, Expect } from "@type-challenges/utils";

// 使用数组长度判断，如果为 0 返回 never
// type First<T extends unknown[]> = T['length'] extends 0 ? never : T[0];

// 使用 infer 判断，将第一个值推导到 F 中，剩余的放在 R
type First<T extends unknown[]> = T extends [infer F, ...infer R] ? F : never;

type Test = First<[]>;

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];
