import type { Equal, Expect } from "@type-challenges/utils";

// 分别使用 infer 来推导每一个数组中的数据，然后整合起来返回
type Concat<T extends any[], U extends any[]> = T extends [...infer R]
  ? U extends [...infer K]
    ? [...R, ...K]
    : [...R]
  : [];

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<
    Equal<
      Concat<["1", 2, "3"], [false, boolean, "4"]>,
      ["1", 2, "3", false, boolean, "4"]
    >
  >,
];
