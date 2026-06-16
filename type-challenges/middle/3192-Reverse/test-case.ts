import type { Equal, Expect } from "@type-challenges/utils";

// 直接使用数组的匹配机制，然后一个个递归调用反转即可
type Reverse<T extends any[]> = T extends [infer F, ...infer R]
  ? [...Reverse<R>, F]
  : T;

type T1 = Reverse<[]>;
type T2 = Reverse<["a", "b"]>;
type T3 = Reverse<["a", "b", "c"]>;

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<["a", "b"]>, ["b", "a"]>>,
  Expect<Equal<Reverse<["a", "b", "c"]>, ["c", "b", "a"]>>,
];
