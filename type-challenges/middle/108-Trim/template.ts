// 1、实现TrimLeft和TrimRight
// 2、将两者递归使用即可

type TrimLeft<T extends string> = T extends `${" " | "\n" | "\t"}${infer R}`
  ? TrimLeft<R>
  : T;
type TrimRight<T extends string> = T extends `${infer R}${" " | "\n" | "\t"}`
  ? TrimRight<R>
  : T;

type Trim<S extends string> = TrimLeft<TrimRight<S>>;

export { Trim };
