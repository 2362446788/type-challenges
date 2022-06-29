// 1、设置一个R来统计数量
// 2、模式匹配一个个递归获取到值
// 3、最后返回R的长度

type LengthOfString<
  S extends string,
  R extends any[] = []
> = S extends `${infer F}${infer U}`
  ? LengthOfString<U, [F, ...R]>
  : R["length"];
