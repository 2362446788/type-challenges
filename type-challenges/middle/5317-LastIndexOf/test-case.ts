import type { Equal, Expect } from "@type-challenges/utils";

// 优先匹配后面的数据，如果后面的 R 匹配上了，前面的所有数据的长度就是索引值
type LastIndexOf<T extends any[], V> = T extends [...infer F, infer R]
  ? Equal<R, V> extends true
    ? F["length"]
    : LastIndexOf<F, V>
  : -1;

type T1 = LastIndexOf<[1, 2, 3, 2, 1], 2>;

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, "a", number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, "a", any, 1], any>, 5>>,
];
