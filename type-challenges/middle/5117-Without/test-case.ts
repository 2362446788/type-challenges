import type { Equal, Expect } from "@type-challenges/utils";

type ArrayToUnion<T extends any[]> = T[number];

type ForUnion<T extends number | any[]> = T extends number
  ? T
  : T extends any[]
    ? ArrayToUnion<T>
    : never;

// 首先要过滤掉第二个参数中的，需要把其变成 union 类型这样才好比较
type Without<
  T extends any[],
  V extends number | any[],
  U extends any[] = [],
> = T extends [infer F, ...infer R]
  ? F extends ForUnion<V>
    ? Without<R, V, U>
    : Without<R, V, [...U, F]>
  : U;

type T1 = Without<[1, 2], 1>;

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
];
