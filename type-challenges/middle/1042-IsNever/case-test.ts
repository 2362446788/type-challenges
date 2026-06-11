import type { Equal, Expect } from "@type-challenges/utils";

// 特殊规则
// never 在条件类型中也比较特殊，如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never
// type TestNever<T> = T extends never ? true : false;
// type T1 = TestNever<never>; // never
// 所以不能直接判断 never，使用一个数组将其变成数组来判断就可以了
type isNever<T> = [T] extends [never] ? true : false;

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<"">, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
];
