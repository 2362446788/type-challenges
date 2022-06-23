// 1、做字符串模式匹配
// 2、采用内部内置类Uppercase实现大小写转换
type MyCapitalize<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S;
