import type { Equal, Expect } from "@type-challenges/utils";

// 将输入的值变成字符串来计算，再使用模板字符串的机制去匹配数据
type Trunc<T extends number | string> = `${T}` extends `${infer F}.${string}`
  ? F
  : `${T}`;

type cases = [
  Expect<Equal<Trunc<0.1>, "0">>,
  Expect<Equal<Trunc<1.234>, "1">>,
  Expect<Equal<Trunc<12.345>, "12">>,
  Expect<Equal<Trunc<-5.1>, "-5">>,
  Expect<Equal<Trunc<"1.234">, "1">>,
  Expect<Equal<Trunc<"-10.234">, "-10">>,
  Expect<Equal<Trunc<10>, "10">>,
];
