import type { Equal, Expect } from "@type-challenges/utils";

// 要填充具体位置，那么需要依次遍历过去，构建一个新的数组，当新数组的长度处于这个范围值，那么填充到新数组的就是需要填充的值
// 那么就需要解决以下几个问题
// 1. 怎么判断是否在区间中？区间是左开右闭吗？[)
//    可以构造一个数组，数组从区间的开始索引进行填充，不包含结束索引，最有将数组构造成 union 类型这样就能使用 extends 进行匹配
// 2. 怎么构造新数组呢? 使用新泛型来存储

// 数组转 union
type ArrToUnion<T extends any[]> = T[number];

// 加一
type AddOne<T extends number, V extends any[] = []> = V["length"] extends T
  ? [...V, any]["length"]
  : AddOne<T, [...V, any]>;

// 构造索引区间
type Section<
  Start extends number = 0,
  End extends number = 0,
  R extends number[] = [],
> = End extends 0
  ? []
  : Start extends End
    ? R
    : // Start 的下一个值，使用 AddOne 来构造
      // : Section<?, End, [...R, Start]>
      Section<AddOne<Start>, End, [...R, Start]>;

type FillItem<T extends any[], N, U, V extends any[] = []> = T extends [
  infer F,
  ...infer R,
]
  ? // 判断当前数组的长度是否满足开始索引位置，如果是那么下一个值就需要改成 N
    V["length"] extends U
    ? FillItem<R, N, U, [...V, N]>
    : FillItem<R, N, U, [...V, F]>
  : V;

// 使用 Val 来存储新数组的值
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
> = FillItem<T, N, ArrToUnion<Section<Start, End>>>;

type T1 = Fill<[1, 2, 3], 0>;

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
];
