import type { Equal, Expect } from "@type-challenges/utils";

// 参考 Equal，做两个类型是否完全相同进行比较
// 这是一个特殊规则，记住就好
type IsEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
    ? true
    : false;

// 使用数组的匹配机制，然后新增一个数组类型来保存已经遍历过的数据，如果下一个找到了就会烦这个数组的长度
// 一直遍历完整都没有找到就直接返回 -1
type IndexOf<T extends any[], V, U extends any[] = []> = T extends [
  infer F,
  ...infer R,
]
  ? IsEqual<F, V> extends true
    ? U["length"]
    : IndexOf<R, V, [...U, any]>
  : -1;

type T1 = IndexOf<[string, 1, number, "a"], number>;

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, "a"], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, "a", any], any>, 4>>,
];
