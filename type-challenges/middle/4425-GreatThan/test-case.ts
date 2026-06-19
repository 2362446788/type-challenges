import type { Equal, Expect } from "@type-challenges/utils";

type CreateArray<N extends number, V extends any[] = []> = V["length"] extends N
  ? V
  : CreateArray<N, [...V, any]>;

// ts 中无法直接进行数学运算，只能通过数组来进行操作
// 因此写一个根据数字来创建数组的类型 CreateArray
// T > U，即 T 里面包含了所有的 U，并且至少多了一个值
// 可以使用 extends 进行比较 CreateArray<T> extends [...CreateArray<U>, any, ...infer _]
type GreaterThan<T extends number, U extends number> =
  CreateArray<T> extends [...CreateArray<U>, any, ...infer _] ? true : false;

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
];
