import type { Equal, Expect } from "@type-challenges/utils";

// 初始思路
// type Flatten<T extends any[]> = T extends [infer F, ...infer R] ? Flatten<[F extends any[] ? (...F) : F, ...Flatten<R>]> : [];

// 只扁平一次
type Flatten<T extends any[]> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? [...F, ...Flatten<R>]
    : [F, ...Flatten<R>]
  : T;

type T1 = Flatten<[1, 2, [3], [4, [5]]]>;

// 这种过不了这个 case FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>
// 会报 Type instantiation is excessively deep and possibly infinite.
// 因为长度太长导致一致递归执行超出了 ts 的限制
// 而下面那种不会，因为他有在类型里面判断了 T extends [infer F, ...infer R]，这个就是按数组长度的匹配，就算 D 的数据很大也不用递归执行那么多次，只用执行具体数组的长度次数
// type FlattenDepth<
//   T extends any[],
//   D = 1,
//   V extends any[] = [],
// > = V["length"] extends D ? T : FlattenDepth<Flatten<T>, D, [...V, any]>;

// 使用递归的规则
// ts 中数组无法数学运算，所以需要使用到数组来做数学运算
// 1. 支持三个参数 T（目标值）、D（要扁平的层数）、V（用来存储扁平了几次，用于判断是否需要继续进行扁平）
// 2. V["length"] extends D 判断如果扁平次数到达了就直接返回 T
// 3. T extends [infer F, ...infer R]，依次遍历数组，如果没办法遍历了，即空对象了直接返回 T 即可
// 4. 获取到 F 和剩余数据 R，判断 F 是否是数组
//    是数组：返回一个新数组 [...FlattenDepth<F, D, [...V, any]>, ...FlattenDepth<R, D, V>]，前面是针对当前 F 得递归调用，并且把调用次数加 1，后面是针对剩余数据的递归调用，因为还没有解构，所以不用加 1
//    不是数组：返回一个新数组 [F, ...FlattenDepth<R, D, V>]，与上面不同的是这个 F 不用在递归进行扁平化
type FlattenDepth<
  T extends any[],
  D = 1,
  V extends any[] = [],
> = V["length"] extends D
  ? T
  : T extends [infer F, ...infer R]
    ? F extends any[]
      ? [...FlattenDepth<F, D, [...V, any]>, ...FlattenDepth<R, D, V>]
      : [F, ...FlattenDepth<R, D, V>]
    : T;

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >,
];
