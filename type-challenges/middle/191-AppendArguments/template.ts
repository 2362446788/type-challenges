// 1、将Fn推导出来，获取到args和返回值
// 2、将A添加到Fn中即可

type AppendArgument<
  Fn extends (...args: any[]) => unknown,
  A extends unknown
> = Fn extends (...args: infer F) => infer R
  ? (...args: [...F, A]) => R
  : never;
