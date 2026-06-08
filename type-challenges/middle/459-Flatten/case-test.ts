import type { Equal, Expect } from "@type-challenges/utils";

// 通过数组匹配方式，匹配第一项 F，判断是否是数组
// 如果是就 [...F, ...R] 解构 F 形成新数组，然后递归调用
// 如果不是就把 F 放进新数组，[F, ...R]，然后剩余的 R 呢就使用递归调用 [F, ...Flatten<R>]
// 一开始就没匹配上返回 []
type Flatten<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? Flatten<[...F, ...R]>
    : [F, ...Flatten<R>]
  : [];

type T1 = Flatten<[1, [2]]>;

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
      [{ foo: "bar"; 2: 10 }, "foobar"]
    >
  >,
];
