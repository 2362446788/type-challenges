import type { Equal, Expect } from "@type-challenges/utils";

// 需要使用函数的类型匹配，使用剩余运算符将参数都写到 args 中，然后通过 infer 推导到 R 中
type MyParameters<T> = T extends (...args: infer R) => any ? R : never;

// 内置高级类型
type T1 = Parameters<typeof foo>;

const foo = (arg1: string, arg2: number): void => {};
const bar = (arg1: boolean, arg2: { a: "A" }): void => {};
const baz = (): void => {};

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: "A" }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
];
