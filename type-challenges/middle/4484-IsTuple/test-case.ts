import type { Equal, Expect } from "@type-challenges/utils";

// 1. 首先排除 never
// 2. tuple 的结构就是 readonly 的数组，并且 length 是具体的数字而不是 number，所以 number extends T["length"] 如果能通过的话就是普通数组，不能通过的话就是元组
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
    ? number extends T["length"]
      ? false
      : true
    : false;

type T1 = number extends 1 ? true : false; // false
type T2 = number extends number ? true : false; // true
type T3 = 1 extends number ? true : false; // true
type T4 = 1 extends 1 ? true : false; // true

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
];
