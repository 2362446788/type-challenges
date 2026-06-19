import type { Equal, Expect } from "@type-challenges/utils";

// 使用数组的匹配机制
// 将第一个数组和第二个数组都进行匹配，都能找到的才获取出来，如果有一个找不到就直接返回 []
// 都找到就构造一个新的数组返回，然后将剩余的内容进行递归调用 [[F, O], ...Zip<R, V>]
type Zip<T extends any[], U extends any[]> = T extends [infer F, ...infer R]
  ? U extends [infer O, ...infer V]
    ? [[F, O], ...Zip<R, V>]
    : []
  : [];

type T1 = Zip<[1, 2, 3], ["1", "2"]>;

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ["1", "2"]>, [[1, "1"], [2, "2"]]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
];
