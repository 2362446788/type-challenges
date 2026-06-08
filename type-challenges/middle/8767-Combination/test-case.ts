import type { Equal, Expect } from "@type-challenges/utils";

// 1. 输入是数组，输出却是一个 union，那么就可以使用 T[number] 来将数组转换成 union
// 先约束入参 T extends string[]，然后判断
// type Combination<T extends string[]> = {};
// 2. 然后遍历数组计算，使用 number 将其转换成 union
// type Combination<T extends string[]> = {
//   [K in keyof T]: T[K];
// }[number];
// type T1 = Combination<['foo', 'bar', 'baz']>; // "foo" | "bar" | "baz"
// 3. 现在只有每个元素的值，没有和其他元素组合起来，需要将 T[K] | 剩余的联合，剩余的联合都是字符串，可以使用 `${T[K]}${递归调用除了 K 的其他剩余值}`
// 实现一个 MyFilter 将 T[K] 这一项排除进行递归调用
type Combination<T extends string[]> = {
  [K in keyof T]: T[K] | `${T[K]} ${Combination<MyFilter<T, T[K]>>}`;
}[number];
type T1 = Combination<["foo", "bar", "baz"]>;

type MyFilter<T, U, P extends any[] = []> = T extends [infer F, ...infer R]
  ? MyFilter<R, U, F extends U ? P : [...P, F]>
  : P;
type T = MyFilter<["foo", "bar"], "foo">; // ['bar]

type cases = [
  Expect<
    Equal<
      Combination<["foo", "bar", "baz"]>,
      | "foo"
      | "bar"
      | "baz"
      | "foo bar"
      | "foo bar baz"
      | "foo baz"
      | "foo baz bar"
      | "bar foo"
      | "bar foo baz"
      | "bar baz"
      | "bar baz foo"
      | "baz foo"
      | "baz foo bar"
      | "baz bar"
      | "baz bar foo"
    >
  >,
];
