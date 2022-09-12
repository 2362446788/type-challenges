// 通过 number 直接可以将元组类型转换为联合类型
type ArrToUnion<T extends Array<any>> = T[number];

// 数字加1
type AddOne<T extends number, R extends number[] = []> = R["length"] extends T
  ? [...R, any]["length"]
  : AddOne<T, [...R, any]>;

// 计算数组Start~End之间的索引index
type Section<
  Start extends number = 0,
  End extends number = 0,
  R extends number[] = []
> = End extends 0
  ? []
  : Start extends End
  ? [...R]
  : Section<AddOne<Start>, End, [...R, Start]>;

// 替换区间为[0, 1)
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  Val extends any[] = []
> = T extends [infer F, ...infer R]
  ? Val["length"] extends ArrToUnion<Section<Start, End>>
  ? Fill<R, N, Start, End, [...Val, N]>
  : Fill<R, N, Start, End, [...Val, F]>
  : Val;