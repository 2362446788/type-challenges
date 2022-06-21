// 1、先做模式匹配，将第一个属于空白的字符去除
// 2、然后递归去除空白字符
// 3、将最后的结果返回即可

type TrimLeft<S extends string> = S extends `${" " | "\n" | "\t"}${infer R}`
  ? TrimLeft<R>
  : S;
